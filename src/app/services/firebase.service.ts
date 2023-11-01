import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {ItemCollection} from "../models/item-collection.model";

export abstract class FirebaseService<Ty> {
  items: AngularFireList<Ty>
  protected constructor(protected path: string, protected db: AngularFireDatabase) {
    this.items = this.db.list(path);
  }

  create(item: Ty): ItemCollection<Ty> {
    const path = this.items.push(item).toString();
    return new ItemCollection<Ty>(path.substring(path.lastIndexOf("/")), item)
  }

  update(uid: string, item: Ty) {
    this.items.update(uid, item)
  }

  delete(uid: string) {
    this.items.remove(uid);
  }

  async getAll(): Promise<ItemCollection<Ty>[]> {
    let data = await this.items.query.get();
    const arr: ItemCollection<Ty> [] = []
    if (data.exists()) {
      const collection = data.val();

      for (let key in collection)
        arr.push(new ItemCollection<Ty>(key, collection[key] as Ty))
    }
    return arr;
  }

}
