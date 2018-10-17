import { Contact } from '../../server/contact';

/*
 * Defines test db content, may be used to populate the db.
*/

export const contacts: Contact[] = [{
  _id: '0001',
  name: 'James Hackett',
  fields: {
    email: 'james.hackett@ford.com',
    telefone: '+1(212)1234-5678'
  }
}, {
  _id: '0002',
  name: 'Mark Parker',
  fields: {
    cargo: 'CEO',
    empresa: 'Nike'
  }
}, {
  _id: '0003',
  name: 'Paul Polman',
  fields: {
    email: 'paul.polman@unilever.com'
  }
}, {
  _id: '0004',
  name: 'Susumu Asaga',
  fields: {
    email: 'susumu.asaga@gmail.com',
    telefone: '+55(11)98430-9134',
  }
}, {
  _id: '0005',
  name: 'Tim Cook',
  fields: {
    telefone: '+1(212)9876-5432'
  }
}];
