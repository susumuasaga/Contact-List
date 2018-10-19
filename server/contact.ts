export interface Contact {
  _id?: string;
  name: string;
  fields: Fields;
}

export interface Fields { [name: string]: string; }
