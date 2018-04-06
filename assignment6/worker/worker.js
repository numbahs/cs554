/**
 * @file app.js
 * @author: Albert Tang
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const redisConnection = require('../redis-connection');
const axios = require('axios');

const APIKEY = '8605152-4f105daf3d09c80c79e467161';

const pixaBayDefault = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 5000
});

const emitMessage = (msg, data, err = false) => {
  const { eventName, requestId } = msg;
  redisConnection.emit(
    `${eventName}:${err ? 'failed' : 'success'}:${requestId}`,
    {
      data,
      requestId,
      eventName
    }
  );
};

redisConnection.on('search:request:*', async dataSend => {
  try {
    let { data } = await pixaBayDefault({
      params: {
        key: APIKEY,
        q: dataSend.data.query
      }
    });
    emitMessage(dataSend, data);
  } catch (err) {
    emitMessage(dataSend, { data: err.toString() }, true);
    console.error(err);
  }
});

console.log('listening for messages');
