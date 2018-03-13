const data = require('./dummydata');

module.exports = {
  getById: id => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data[id - 1]) {
          resolve(data[id - 1]);
        } else {
          reject(`${id} is not a valid id`);
        }
      }, 5000);
    });
  }
}