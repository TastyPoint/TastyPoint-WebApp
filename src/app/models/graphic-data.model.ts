import { ItemCollection } from './item-collection.model';
import { Reading } from './reading.model';

export interface GraphicData {
  readings: Array<Reading>;
}

export type GraphicDataCollection = ItemCollection<GraphicData>;
