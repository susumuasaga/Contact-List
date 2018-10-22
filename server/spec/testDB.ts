import { Contact } from '../contact';

/*
 * Defines test db content, may be used to populate the db.
*/

export const contacts: Contact[] = [{
  name: 'Paul Polman',
  fields: {
    'E-mail': 'paul.polman@unilever.com'
  }
}, {
  name: 'Tim Cook',
  fields: {
    'Telefone': '+1(212)9876-5432'
  }
}, {
  name: 'Mark Parker',
  fields: {
    'Cargo': 'CEO',
    'Empresa': 'Nike'
  }
}, {
  name: 'Susumu Asaga',
  fields: {
    'E-mail': 'susumu.asaga@gmail.com',
    'Telefone': '+55(11)98430-9134',
    'Cargo': 'Engenheiro de Software Senior'
  }
}, {
  name: 'James Hackett',
  fields: {
    'E-mail': 'james.hackett@ford.com',
    'Telefone': '+1(212)1234-5678'
  }
}];
