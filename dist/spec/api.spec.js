"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const superagent = require("superagent");
const http_status_1 = require("http-status");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fakeLogger_1 = require("./fakeLogger");
const contact_1 = require("../contact");
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
    beforeAll(async () => {
        const app = express();
        app.use(morgan('combined'));
        mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        contactModel = contact_1.CreateContactModel();
        logger = new fakeLogger_1.FakeLogger();
        app.use(api_1.api(contactModel, logger));
        server = await server$(app, 3000);
    });
    beforeEach(async () => {
        await contactModel.deleteMany({});
        await contactModel.create(testDB_1.contacts);
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
        const contactDoc = await contactModel
            .findOne()
            .where('name').equals('Susumu Asaga')
            .exec();
        const res = await superagent.get(URL_ROOT + '/contacts/' + contactDoc._id);
        expect(res.status).toBe(http_status_1.OK);
        const body = res.body;
        expect(body.name).toBe('Susumu Asaga');
    });
    it('should NOT_FOUND when contact _id not found', async () => {
        const id = '123456789abcdef012345678';
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
    it('can create and remove a contact', async () => {
        const contact = {
            name: 'James Hackett',
            fields: {
                email: 'james.hackett@ford.com',
            }
        };
        let res = await superagent
            .post(URL_ROOT + '/contacts')
            .send(contact);
        expect(res.status).toBe(http_status_1.OK);
        const id = res.body._id;
        const contactDoc = await contactModel.findById(id).exec();
        expect(contactDoc.name).toBe('James Hackett');
        res = await superagent
            .delete(URL_ROOT + '/contacts/' + id);
        expect(res.status).toBe(http_status_1.OK);
    });
    it('should allow delete of non-existing contact', async () => {
        const id = '123456789abcdef012345678';
        const res = await superagent
            .delete(URL_ROOT + '/contacts/' + id);
        expect(res.status).toBe(http_status_1.OK);
    });
    it('can update existing contact', async () => {
        const id = (await contactModel
            .findOne()
            .where('name').equals('Susumu Asaga')
            .exec())._id;
        const contact = {
            _id: id,
            name: 'Susumu Asaga',
            fields: {
                email: 'susumu.asaga@gmail.com',
                telefone: '(11)98430-9134'
            }
        };
        const res = await superagent
            .put(URL_ROOT + '/contacts/' + id)
            .send(contact);
        expect(res.status).toBe(http_status_1.OK);
        const contactDoc = await contactModel.findById(id).exec();
        expect(contactDoc.fields.empresa).toBeFalsy();
    });
    it('should create a new contact ' +
        'when try to update non-existing contact', async () => {
        let id = '123456789abcdef012345678';
        const contact = {
            _id: id,
            name: 'James Hackett',
            fields: {
                email: 'james.hackett@ford.com',
            }
        };
        const res = await superagent
            .put(URL_ROOT + '/contacts/' + id)
            .send(contact);
        expect(res.status).toBe(http_status_1.OK);
        id = res.body._id;
        const contactDoc = await contactModel.findById(id).exec();
        expect(res.body.name).toBe('James Hackett');
        await contactDoc.remove();
    });
});