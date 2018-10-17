"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const superagent = require("superagent");
const http_status_1 = require("http-status");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fakeLogger_1 = require("./fakeLogger");
const contactModel_1 = require("../contactModel");
const api_1 = require("../api");
const testDB_1 = require("./testDB");
const URL_ROOT = 'http://localhost:3000';
function server$(app, port) {
    return new Promise(resolve => {
        const server = app.listen(3000, () => resolve(server));
    });
}
describe('API', function () {
    let server;
    let contactModel;
    let logger;
    let id;
    beforeAll(async () => {
        const app = express();
        app.use(morgan('combined'));
        mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        contactModel = contactModel_1.CreateContactModel();
        logger = new fakeLogger_1.FakeLogger();
        app.use(api_1.api(contactModel, logger));
        server = await server$(app, 3000);
    });
    beforeEach(async () => {
        await contactModel.deleteMany({});
        await contactModel.create(testDB_1.contacts);
        const contactDoc = await contactModel
            .findOne()
            .where('name').equals('James Hackett')
            .exec();
        id = contactDoc._id.toHexString();
    });
    afterAll(function () {
        mongoose.models = {};
        mongoose.disconnect();
        server.close();
    });
    it('can retrieve all contacts', async () => {
        const res = await superagent.get(URL_ROOT + '/contacts');
        expect(res.status).toBe(http_status_1.OK);
        testDB_1.contacts.sort((a, b) => a.name.localeCompare(b.name));
        const body = res.body;
        expect(body.length).toBe(testDB_1.contacts.length);
        for (let i = 0; i < body.length; i++) {
            expect(body[i].name).toBe(testDB_1.contacts[i].name);
        }
    });
    it('can retrieve a single contact', async () => {
        const res = await superagent.get(URL_ROOT + '/contacts/' + id);
        expect(res.status).toBe(http_status_1.OK);
        const contact = res.body;
        expect(contact.name).toBe('James Hackett');
    });
    it('should NOT_FOUND when contact id not found', async () => {
        id = '123456789abcdef012345678';
        logger.clearErrorLog();
        await (async () => {
            try {
                await superagent.get(URL_ROOT + '/contacts/' + id);
                fail('Contact not found, but error not caught.');
            }
            catch (err) {
                const lastError = logger.lastError;
                expect(lastError.statusCode).toBe(http_status_1.NOT_FOUND);
                expect(err.response.statusCode).toBe(http_status_1.NOT_FOUND);
            }
        })();
    });
    it('can create a contact', async () => {
        let contact = {
            name: 'Andresa Rosa',
            fields: {
                email: 'andresa.rosa@bravi.com.br',
                telefone: '+55(48)3304-6336',
                endereço: 'Rua Doutor Agostinho Sielski, 67'
            }
        };
        const res = await superagent
            .post(URL_ROOT + '/contacts')
            .send(contact);
        expect(res.status).toBe(http_status_1.OK);
        contact = res.body;
        const contactDoc = await contactModel.findById(contact._id).exec();
        expect(contactDoc.name).toBe('Andresa Rosa');
    });
    it('can remove a contact', async () => {
        const res = await superagent.delete(URL_ROOT + '/contacts/' + id);
        expect(res.status).toBe(http_status_1.OK);
    });
    it('should allow delete of non-existing contact', async () => {
        id = '123456789abcdef012345678';
        const res = await superagent
            .delete(URL_ROOT + '/contacts/' + id);
        expect(res.status).toBe(http_status_1.OK);
    });
    it('can add a field to existing contact', async () => {
        const contact = {
            _id: id,
            name: 'James Hackett',
            fields: {
                email: 'james.hackett@ford.com',
                telefone: '+1(212)1234-5678',
                empresa: 'Ford',
            }
        };
        const res = await superagent
            .put(URL_ROOT + '/contacts/' + id)
            .send(contact);
        expect(res.status).toBe(http_status_1.OK);
        const contactDoc = await contactModel.findById(id).exec();
        expect(contactDoc.fields.get('empresa')).toBe('Ford');
    });
    it('can remove a field from existing contact', async () => {
        const contact = {
            _id: id,
            name: 'James Hackett',
            fields: {
                email: 'james.hackett@ford.com'
            }
        };
        const res = await superagent
            .put(URL_ROOT + '/contacts/' + id)
            .send(contact);
        expect(res.status).toBe(http_status_1.OK);
        const contactDoc = await contactModel.findById(id).exec();
        expect(contactDoc.fields.get('telefone')).toBeFalsy();
    });
    it('should create a new contact ' +
        'when try to update non-existing contact', async () => {
        id = '123456789abcdef012345678';
        let contact = {
            _id: id,
            name: 'Andresa Rosa',
            fields: {
                email: 'andresa.rosa@bravi.com.br',
                telefone: '+55(48)3304-6336',
                endereço: 'Rua Doutor Agostinho Sielski, 67'
            }
        };
        const res = await superagent
            .put(URL_ROOT + '/contacts/' + id)
            .send(contact);
        expect(res.status).toBe(http_status_1.OK);
        contact = res.body;
        id = contact._id;
        const contactDoc = await contactModel.findById(id).exec();
        expect(contactDoc.name).toBe('Andresa Rosa');
    });
});