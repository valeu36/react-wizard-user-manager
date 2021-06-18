import Database from '../index';

class NewUserTable extends Database {
  constructor() {
    super('tempFormData');
    this.formDataIndex = '';
  }

  updateFormData(formData) {
    return this.put(formData, this.formDataIndex);
  }

  getFormData() {
    return this.getByID(this.formDataIndex);
  }

  clearFormData() {
    return this.clearTable();
  }
}
export default new NewUserTable();
