import express = require('express');
const app = express();
import mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useCreateIndex: true
});
import { CreateContactModel } from './contact';
const contactModel = CreateContactModel();
import * as winston from 'winston';
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
import { api } from './api';
app.use('/api', api(contactModel, logger));
app.use('/node_modules', express.static('./node_modules'));
app.use(express.static('./dist/contact-list'));
app.listen(3000,
  () => console.log('App listening at port 3000.'));
