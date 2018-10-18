"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const http_status_1 = require("http-status");
class HttpError extends Error {
}
exports.HttpError = HttpError;
class NotFound extends HttpError {
    constructor(message) {
        super();
        this.message =
            message || 'O recurso requerido não foi encontrado.';
        this.statusCode = http_status_1.NOT_FOUND;
    }
}
class BadRequest extends HttpError {
    constructor(message) {
        super();
        this.message = message || 'Pedido inválido.';
        this.statusCode = http_status_1.BAD_REQUEST;
    }
}
function api(contactModel, logger) {
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
        const contact = req.body;
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
        const contact = req.body;
        if (!contact) {
            next(new BadRequest('Nenhum contato especificado.'));
        }
        const id = req.params.id;
        let contactDoc = await contactModel.findById(id).exec();
        if (contactDoc) {
            contactDoc.set(contact);
        }
        else {
            delete contact._id;
            contactDoc = new contactModel(contact);
        }
        contactDoc = await contactDoc.save();
        res.json(contactDoc);
    });
    router.use((err, req, res, next) => {
        logger.error(err);
        delete err.stack;
        res.status(err.statusCode || http_status_1.INTERNAL_SERVER_ERROR).json(err);
    });
    return router;
}
exports.api = api;