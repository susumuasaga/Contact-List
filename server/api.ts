import bodyParser = require('body-parser');
import express = require('express');
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } from 'http-status';
import { Logger } from './logger';
import { ContactModel } from './contactModel';
import { Contact } from './contact';

export abstract class HttpError extends Error {
  statusCode: number;
  errorCode: number;
}
class NotFound extends HttpError {
  constructor(message?: string) {
    super();
    this.message =
      message || 'O recurso requerido não foi encontrado.';
    this.statusCode = NOT_FOUND;
  }
}
class BadRequest extends HttpError {
  constructor(message?: string) {
    super();
    this.message = message || 'Pedido inválido.';
    this.statusCode = BAD_REQUEST;
  }
}
export function api(contactModel: ContactModel, logger: Logger) {
  const router = express.Router();
  router.use(bodyParser.json());

  router.get('/contacts', async (req, res) => {
    const contactDocs = await contactModel.find().sort('name').exec();
    res.json(contactDocs);
  });

  router.get('/contacts/:id', async (req, res, next) => {
    const id = req.params.id;
    const contactDoc = await contactModel.findById(id).exec();
    if (!contactDoc) {
      next(new NotFound(`Contato ${id} não encontrado.`));
      return;
    }
    res.json(contactDoc);
  });

  router.post('/contacts', async (req, res, next) => {
    const contact = req.body as Contact;
    if (!contact) {
      next(new BadRequest('Nenhum contato especificado.'));
    }
    let contactDoc = new contactModel(contact);
    contactDoc = await contactDoc.save();
    res.json(contactDoc);
  });

  router.delete('/contacts/:id', async (req, res) => {
    const id = req.params.id;
    const contactDoc = await contactModel.findById(id).exec();
    if (contactDoc) {
      await contactDoc.remove();
    }
    res.json(contactDoc);
  });

  router.put('/contacts/:id', async (req, res, next) => {
    const contact: Contact = req.body;
    if (!contact) {
      next(new BadRequest('Nenhum contato especificado.'));
    }
    const id = req.params.id;
    let contactDoc = await contactModel.findById(id).exec();
    if (contactDoc) {
      contactDoc.set(contact);
    } else {
      delete contact._id;
      contactDoc = new contactModel(contact);
    }
    contactDoc = await contactDoc.save();
    res.json(contactDoc);
  });

  router.use(
    (err: HttpError,
      req: express.Request, res: express.Response,
      next: express.NextFunction) => {
      logger.error(err);
      delete err.stack; // don't send error stack to client
      res.status(err.statusCode || INTERNAL_SERVER_ERROR).json(err);
    }
  );

  return router;
}
