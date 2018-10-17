import express = require('express');
import superagent = require('superagent');
import { OK, NOT_FOUND } from 'http-status';
import http = require('http');
import mongoose = require('mongoose');
import morgan = require('morgan');
import { FakeLogger } from './fakeLogger';
import { ContactModel, CreateContactModel } from '../contactModel';
import { api } from '../api';
import { contacts } from './testDB';
import { Contact } from '../contact';

const URL_ROOT = 'http://localhost:3000';

function server$(app: express.Express, port?: number):
  Promise<http.Server> {
  return new Promise<http.Server>(resolve => {
    const server = app.listen(3000, () => resolve(server));
  });
}

describe('API', function () {
  let server: http.Server;
  let contactModel: ContactModel;
  let logger: FakeLogger;
  let id: string;

  beforeAll(async () => {
    const app = express();
    app.use(morgan('combined'));
    mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    contactModel = CreateContactModel();
    logger = new FakeLogger();
    app.use(api(contactModel, logger));
    server = await server$(app, 3000);
  });

  beforeEach(async () => {
    // Clear database
    await contactModel.deleteMany({});
    // Create test data
    await contactModel.create(contacts);
    // retrieve James Hackett id
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
    expect(res.status).toBe(OK);
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    const body = res.body as Contact[];
    expect(body.length).toBe(contacts.length);
    for (let i = 0; i < body.length; i++) {
      expect(body[i].name).toBe(contacts[i].name);
    }
  });

  it('can retrieve a single contact', async () => {
    const res = await superagent.get(
      URL_ROOT + '/contacts/' + id
    );
    expect(res.status).toBe(OK);
    const contact: Contact = res.body;
    expect(contact.name).toBe('James Hackett');
  });

  it('should NOT_FOUND when contact id not found', async () => {
    id = '123456789abcdef012345678';
    logger.clearErrorLog();
    await (async () => {
      try {
        await superagent.get(URL_ROOT + '/contacts/' + id);
        fail('Contact not found, but error not caught.');
      } catch (err) {
        // Error should have been logged on server side
        const lastError = logger.lastError;
        expect(lastError.statusCode).toBe(NOT_FOUND);
        // Error should have been received on client side
        expect(err.response.statusCode).toBe(NOT_FOUND);
      }
    })();
  });

  it('can create a contact', async () => {
    // Create a contact
    let contact: Contact = {
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
    expect(res.status).toBe(OK);
    contact = res.body;
    // Check if it was created
    const contactDoc = await contactModel.findById(contact._id).exec();
    expect(contactDoc.name).toBe('Andresa Rosa');
  });

  it('can remove a contact', async () => {
    const res = await superagent.delete(URL_ROOT + '/contacts/' + id);
    expect(res.status).toBe(OK);
  });

  it('should allow delete of non-existing contact', async () => {
    id = '123456789abcdef012345678';
    const res = await superagent
      .delete(URL_ROOT + '/contacts/' + id);
    expect(res.status).toBe(OK);
  });

  it('can add a field to existing contact', async () => {
    // add field 'empresa'
    const contact: Contact = {
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
    expect(res.status).toBe(OK);
    // Check if updated
    const contactDoc = await contactModel.findById(id).exec();
    expect(contactDoc.fields.get('empresa')).toBe('Ford');
  });

  it('can remove a field from existing contact', async () => {
    // remove field 'telefone'
    const contact: Contact = {
      _id: id,
      name: 'James Hackett',
      fields: {
        email: 'james.hackett@ford.com'
      }
    };
    const res = await superagent
      .put(URL_ROOT + '/contacts/' + id)
      .send(contact);
    expect(res.status).toBe(OK);
    // Check if updated
    const contactDoc = await contactModel.findById(id).exec();
    expect(contactDoc.fields.get('telefone')).toBeFalsy();
  });

  it('should create a new contact ' +
    'when try to update non-existing contact', async () => {
      id = '123456789abcdef012345678';
      let contact: Contact = {
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
      expect(res.status).toBe(OK);
      // get new id
      contact = res.body;
      id = contact._id;
      // Check if contact was created
      const contactDoc = await contactModel.findById(id).exec();
      expect(contactDoc.name).toBe('Andresa Rosa');
    });
});
