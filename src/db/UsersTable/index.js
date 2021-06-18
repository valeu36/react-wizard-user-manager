import Database from '../index';

class UsersTable extends Database {
  constructor() {
    super('users');
  }

  getByUserName(name) {
    return this.db[this.table].where({ userName: name }).first();
  }

  getByEmail(userEmail) {
    return this.db[this.table].where({ email: userEmail }).first();
  }

  isEmailExists(user) {
    return new Promise((resolve, reject) => {
      this.getByEmail(user.email).then((data) => {
        if (data && data.id !== user.id) {
          reject(new Error('Email should be unique'));
        }
        resolve();
      });
    });
  }

  isUserNameExists(user) {
    return new Promise((resolve, reject) => {
      this.getByUserName(user.userName).then((data) => {
        if (data && data.id !== user.id) {
          reject(new Error('User Name should be unique'));
        }
        resolve();
      });
    });
  }

  isUserExists(userId) {
    return this.db[this.table]
      .where({ id: userId })
      .first()
      .then((data) => data)
      .catch(() => new Error('User is now found'));
  }

  addUser(user) {
    return this.isUserNameExists(user)
      .then(() =>
        this.isUserNameExists(user)
          .then(() => this.add(user))
          .catch((e) => ({ error: { field: 'userName', message: e.message } })),
      )
      .catch((e) => ({ error: { field: 'email', message: e.message } }));
  }

  updateUser(user, id) {
    return this.isUserExists(id)
      .then(() =>
        this.isUserNameExists(user)
          .then(() =>
            this.isUserNameExists(user)
              .then(() => this.put(user, id))
              .catch((e) => ({ error: { field: 'email', message: e.message } })),
          )
          .catch((e) => ({ error: { field: 'userName', message: e.message } })),
      )
      .catch((e) => ({ error: { field: 'id', message: e.message } }));
  }

  deleteUser(id) {
    return this.isUserExists(id)
      .then(() => this.delete(id))
      .catch((e) => ({ error: { field: 'id', message: e.message } }));
  }

  getUser(id) {
    return this.isUserExists(id)
      .then(() => this.getByID(id))
      .catch((e) => ({ error: { field: 'id', message: e.message } }));
  }

  getUsers(params) {
    const { skip, limit, query } = params;
    if (!skip && !limit) {
      return this.db[this.table].orderBy('lastUpdate').reverse().toArray();
    }
    if (query) {
      const testRegex = new RegExp(query, 'i');

      return this.db[this.table]
        .orderBy('lastUpdate')
        .reverse()
        .filter((user) => testRegex.test(user.firstName) || testRegex.test(user.lastName))
        .offset(skip)
        .limit(limit)
        .toArray()
        .then((users) =>
          this.db[this.table]
            .filter((user) => testRegex.test(user.firstName) || testRegex.test(user.lastName))
            .count()
            .then((total) => [users, total]),
        );
    }

    return this.db[this.table]
      .orderBy('lastUpdate')
      .reverse()
      .offset(skip)
      .limit(limit)
      .toArray()
      .then((users) => this.db[this.table].count().then((total) => [users, total]));
  }

  insertUsers(data) {
    return this.insert(data);
  }

  clearUsersTable() {
    return this.clearTable();
  }

  getUsersByQuery(query) {
    const lcQuery = query.toLowerCase();
    const testRegex = new RegExp(lcQuery, 'i');
    return this.db[this.table]
      .filter((user) => testRegex.test(user.firstName) || testRegex.test(user.lastName))
      .toArray();
  }
}
export default new UsersTable();
