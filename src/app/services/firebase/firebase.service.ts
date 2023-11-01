import {child, Database, get, ref, set} from "@angular/fire/database";


export abstract class FirebaseService {
  protected constructor(protected database: Database) {}

  private getRef(path: string) {
    return ref(this.database, path);
  }

  protected setData(path: string, data: any) {
    set(this.getRef(path), data)
      .then();
  }

  protected getData(path: string) {
    return get(child(ref(this.database), path))
  }


  protected async getDataOnExists<Ty>(path: string, onExists: (data: any) => Ty | undefined): Promise<Ty | undefined> {
    const snapshot = await this.getData(path);
    return snapshot.exists() ? onExists(snapshot.val()) : undefined;
  }


  protected collectionToArray<Ty>(coll: any, converter: (key: string, value: any) => Ty): Ty[] {
    const arr: Ty[] = [];
    for(let it in coll)
      arr.push(converter(it, coll[it]))

    return arr;
  }

}
