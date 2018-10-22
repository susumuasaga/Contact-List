import { Contact } from '../../server/contact';

/*
 * Defines test db content, may be used to populate the db.
*/

export const contacts: Contact[] = [{
  _id: '0001',
  name: 'James Hackett',
  fields: {
    'E-mail': 'james.hackett@ford.com',
    'Telefone': '+1(212)1234-5678',
    'Cargo': 'CEO',
    'Empresa': 'Ford'
  }
}, {
  _id: '0002',
  name: 'Mark Parker',
  fields: {
    'Cargo': 'CEO',
    'Empresa': 'Nike'
  }
}, {
  _id: '0003',
  name: 'Paul Polman',
  fields: {
    'E-mail': 'paul.polman@unilever.com'
  }
}, {
  _id: '0004',
  name: 'Susumu Asaga',
  fields: {
    'E-mail': 'susumu.asaga@gmail.com',
    'Telefone': '+55(11)98430-9134',
    'Cargo': 'Engenheiro de Software Senior'
  }
}, {
  _id: '0005',
  name: 'Tim Cook',
  fields: {
    'Telefone': '+1(212)9876-5432'
  }
}];
