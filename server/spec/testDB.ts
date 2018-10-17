import { Contact } from '../api';

/*
 * Defines test db content, may be used to populate the db.
*/

export const contacts: Contact[] = [{
  name: 'Paul Polman',
  fields: {
    email: 'paul.polman@unilever.com'
  }
}, {
  name: 'Tim Cook',
  fields: {
    telefone: '+1(212)9876-5432'
  }
}, {
  name: 'Mark Parker',
  fields: {
    cargo: 'CEO',
    empresa: 'Nike'
  }
}, {
  name: 'Susumu Asaga',
  fields: {
    email: 'susumu.asaga@gmail.com',
    telefone: '+55(11)98430-9134',
  }
}, {
  name: 'James Hackett',
  fields: {
    email: 'james.hackett@ford.com',
    telefone: '+1(212)1234-5678'
  }
}];
