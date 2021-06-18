import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';

const dbName = 'wizard_form';
const dbVersion = 1;
const tempFormDataIndex = '';

const db = new Dexie(dbName);

db.version(dbVersion).stores({
  tempFormData: tempFormDataIndex,
  users: 'id, email, userName, firstName, lastName, lastUpdate',
});

class Database {
  constructor(table) {
    this.db = db;
    this.table = table;
  }

  now() {
    return new Date().toISOString();
  }

  uuid() {
    return uuidv4();
  }

  getByID(id) {
    return this.db[this.table].get(id);
  }

  getAll() {
    return this.db[this.table].toArray();
  }

  add(data) {
    const id = this.uuid();
    const lastUpdate = this.now();
    this.db[this.table].add({ ...data, id, lastUpdate });
    return this.getByID(id);
  }

  put(data, id) {
    const lastUpdate = this.now();
    this.db[this.table].put({ ...data, lastUpdate }, id);
    return this.getByID(id);
  }

  delete(id) {
    this.db[this.table].delete(id);
  }

  insert(data) {
    this.db[this.table].bulkAdd(data);
  }

  clearTable() {
    return this.db[this.table].clear();
  }
}
export default Database;
