import { Contact } from '../api';

/*
 * Defines test db content, may be used to populate the db.
*/

export const contacts: Contact[] = [{
  name: 'Unilever Brasil',
  fields: {
    email: 'fulano.de.tal@unilever.com.br'
  }
}, {
  name: 'Apple Computing Brasil',
  fields: {
    telefone: '(11)5503-0000'
  }
}, {
  name: 'Nike do Brasil',
  fields: {
    endereço: 'Rua Werner Siemens 111, São Paulo,SP'
  }
}, {
  name: 'Susumu Asaga',
  fields: {
    email: 'susumu.asaga@gmail.com',
    telefone: '(11)98430-9134',
    endereço: 'Av. Antônio Frederico Ozanan, 9200, 214, Jundiaí, SP'
  }
}];
