"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useCreateIndex: true
});
const contact_1 = require("./contact");
const contactModel = contact_1.CreateContactModel();
const winston = __importStar(require("winston"));
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'error.log', level: 'error'
        }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});
const api_1 = require("./api");
app.use('/api', api_1.api(contactModel, logger));
app.use('/node_modules', express.static('./node_modules'));
app.use(express.static('./dist/contact-list'));
app.listen(3000, () => console.log('App listening at port 3000.'));