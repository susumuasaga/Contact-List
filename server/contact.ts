export interface Contact {
  _id?: string;
  name: string;
  fields: {
    [name: string]: string;
  };
}
