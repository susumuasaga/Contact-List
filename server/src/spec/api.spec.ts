import express = require('express');
import superagent = require('superagent');
import { OK, NOT_FOUND } from 'http-status';
import http = require('http');
import mongoose = require('mongoose');
import morgan = require('morgan');
import { FakeLogger } from './fakeLogger';
import { ContactModel, CreateContactModel } from '../contact';
import { api, Contact } from '../api';
import { contacts } from './testDB';

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
    const contactDoc = await contactModel
      .findOne()
      .where('name').equals('Susumu Asaga')
      .exec();
    const res = await superagent.get(
      URL_ROOT + '/contacts/' + contactDoc._id
    );
    expect(res.status).toBe(OK);
    const body = res.body as Contact;
    expect(body.name).toBe('Susumu Asaga');
  });

  it('should NOT_FOUND when contact _id not found', async () => {
    const id = '123456789abcdef012345678';
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
    const contact: Contact = {
      name: 'Ford Motor Company',
      fields: {
        email: 'henry@ford.com',
      }
    };
    const res = await superagent
      .post(URL_ROOT + '/contacts')
      .send(contact);
    expect(res.status).toBe(OK);
    const id = res.body._id;
    // Retrieve the new contact by its generated _id
    const contactDoc = await contactModel.findById(id).exec();
    expect(contactDoc.name).toBe('Ford Motor Company');
  });

  it('can delete a contact', async () => {
    const contactDoc = await contactModel
      .findOne()
      .where('name').equals('Unilever Brasil')
      .exec();
    const res = await superagent
      .delete(URL_ROOT + '/contacts/' + contactDoc._id);
    expect(res.status).toBe(OK);
  });

  it('should allow delete of non-existing contact', async () => {
    const id = '123456789abcdef012345678';
    const res = await superagent
      .delete(URL_ROOT + '/contacts/' + id);
    expect(res.status).toBe(OK);
  });

  it('can update existing contact', async () => {
    const id = (await contactModel
      .findOne()
      .where('name').equals('Unilever Brasil')
      .exec())._id;
    const contact: Contact = {
      _id: id,
      name: 'Paul Polman',
      fields: {
        empresa: 'Unilever',
        email: 'paul.polman@unilever.com'
      }
    };
    const res = await superagent
      .put(URL_ROOT + '/contacts/' + id)
      .send(contact);
    expect(res.status).toBe(OK);
    // Check if updated
    const contactDoc = await contactModel.findById(id).exec();
    expect(contactDoc.name).toBe('Paul Polman');
  });

  it('should create a new contact ' +
    'when try to update non-existing contact', async () => {
      let id = '123456789abcdef012345678';
      const contact: Contact = {
      _id: id,
      name: 'Ford Motor Company',
      fields: {
        email: 'henry@ford.com'
      }
    };
    const res = await superagent
      .put(URL_ROOT + '/contacts/' + id)
      .send(contact);
    expect(res.status).toBe(OK);
    // get new id
    id = res.body._id;
    // Check if contact created
    const contactDoc = await contactModel.findById(id).exec();
    expect(res.body.name).toBe('Ford Motor Company');
  });
});
