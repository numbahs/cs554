/**
 * @file app.js
 * @author: Albert Tang
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const redisConnection = require('../redis-connection');
const axios = require('axios');

let main = async () => {
  let { data } = await axios.get(
    'https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json'
  );

  console.log('Users grabbed');

  redisConnection.on('get:request:*', message => {
    try {
      let { requestId, eventName } = message;

      let { id } = message.data;
      let successEvent = `${eventName}:success:${requestId}`;
      let failedEvent = `${eventName}:failed:${requestId}`;

      const result = data.filter(x => x.id === parseInt(id));

      if (result[0]) {
        redisConnection.emit(successEvent, {
          requestId,
          data: result[0],
          eventName
        });
      } else {
        redisConnection.emit(failedEvent, {
          requestId,
          data: `Server does not contain person with id: ${id}`,
          eventName
        });
      }
    } catch (err) {
      throw err;
    }
  });

  redisConnection.on('delete:request:*', message => {
    try {
      let { requestId, eventName } = message;
      let { id } = message.data;

      let successEvent = `${eventName}:success:${requestId}`;
      let failedEvent = `${eventName}:failed:${requestId}`;

      const result = data.filter(x => x.id !== parseInt(id));

      if (result !== data) {
        data = result;
        redisConnection.emit(successEvent, {
          requestId,
          data: {
            Event: `Person with id '${id}' has been successfully deleted`
          },
          eventName
        });
      } else {
        redisConnection.emit(failedEvent, {
          requestId,
          data: `Server does not contain person with id: ${id}`,
          eventName
        });
      }
    } catch (err) {
      throw err;
    }
  });

  redisConnection.on('put:request:*', message => {
    try {
      let { requestId, eventName } = message;
      let { id, body } = message.data;
      let { first_name, last_name, email, gender, ip_address } = body;

      let successEvent = `${eventName}:success:${requestId}`;
      let failedEvent = `${eventName}:failed:${requestId}`;

      let replace = {};

      if (first_name) {
        if (typeof first_name !== 'string') {
          redisConnection.emit(failedEvent, {
            requestId,
            data: `${first_name} is not a valid first name!`,
            eventName
          });
          return;
        } else {
          replace['first_name'] = first_name;
        }
      }

      if (last_name) {
        if (typeof last_name !== 'string') {
          redisConnection.emit(failedEvent, {
            requestId,
            data: `${last_name} is not a valid last name!`,
            eventName
          });
          return;
        } else {
          replace['last_name'] = last_name;
        }
      }

      if (email) {
        if (typeof email !== 'string') {
          redisConnection.emit(failedEvent, {
            requestId,
            data: `${email} is not a valid email!`,
            eventName
          });
          return;
        } else {
          replace['email'] = email;
        }
      }

      if (gender) {
        if (typeof gender !== 'string') {
          redisConnection.emit(failedEvent, {
            requestId,
            data: `${gender} is not a valid gender!`,
            eventName
          });
          return;
        } else {
          replace['gender'] = gender;
        }
      }

      if (ip_address) {
        if (typeof ip_address !== 'string') {
          redisConnection.emit(failedEvent, {
            requestId,
            data: `${ip_address} is not a ip address!`,
            eventName
          });
          return;
        } else {
          replace['ip_address'] = ip_address;
        }
      }

      const result = data.map(x => x.id).indexOf(parseInt(id));

      if (result) {
        let set = Object.assign({}, data[result], replace);
        data[result] = set;

        redisConnection.emit(successEvent, {
          requestId,
          data: set,
          eventName
        });
      } else {
        redisConnection.emit(failedEvent, {
          requestId,
          data: `Server does not contain person with id: ${id}`,
          eventName
        });
      }
    } catch (err) {
      throw err;
    }
  });

  redisConnection.on('post:request:*', (message, channel) => {
    try {
      let { requestId, eventName } = message;
      let { body } = message.data;
      let { first_name, last_name, email, gender, ip_address } = body;

      let successEvent = `${eventName}:success:${requestId}`;
      let failedEvent = `${eventName}:failed:${requestId}`;

      if (typeof first_name !== 'string') {
        redisConnection.emit(failedEvent, {
          requestId,
          data: `${first_name} is not a valid first name!`,
          eventName
        });
        return;
      }

      if (typeof last_name !== 'string') {
        redisConnection.emit(failedEvent, {
          requestId,
          data: `${last_name} is not a valid last name!`,
          eventName
        });
        return;
      }

      if (typeof email !== 'string') {
        redisConnection.emit(failedEvent, {
          requestId,
          data: `${email} is not a valid email!`,
          eventName
        });
        return;
      }

      if (typeof gender !== 'string') {
        redisConnection.emit(failedEvent, {
          requestId,
          data: `${gender} is not a valid gender!`,
          eventName
        });
        return;
      }

      if (typeof ip_address !== 'string') {
        redisConnection.emit(failedEvent, {
          requestId,
          data: `${ip_address} is not a valid ip address!`,
          eventName
        });
        return;
      }

      let set = {
        first_name,
        last_name,
        email,
        gender,
        ip_address
      };

      const last = data.length - 1;
      set.id = data[last] ? data[last].id + 1 : 1;

      data.push(set);

      redisConnection.emit(successEvent, {
        requestId,
        data: set,
        eventName
      });
    } catch (err) {
      throw err;
    }
  });
};

main().catch(err => console.error(err));
