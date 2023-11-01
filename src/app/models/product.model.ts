import {ItemCollection} from "./item-collection.model";

export interface Product {
  name: string,
  entryDate: string,
  expirationDate: string
}

export type ProductCollection = ItemCollection<Product>;
