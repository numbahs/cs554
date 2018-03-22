/**
 * @file app.js
 * @author: Albert Tang
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const redisConnection = require("../redis-connection");
const axios = require('axios');

let main = async () => {
  let { data } = await axios.get("https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json");

  redisConnection.on("get:request:*", (message) => {
    try {
      let requestId = message.requestId;
      let eventName = message.eventName;

      let id = message.data.id;
      let successEvent = `${eventName}:success:${requestId}`;
      let failedEvent = `${eventName}:failed:${requestId}`;

      const result = data.filter(x => {
        return x.id === id;
      });

      if (result[0]) {
        redisConnection.emit(successEvent, {
          requestId,
          data: result[0],
          eventName
        })
      } else {
        redisConnection.emit(failedEven, {
          requestId,
          data: { Error: `Server does not contain person with id:${id}`, code: "500" },
          eventName
        })
      }
    } catch (err) {
      throw err;
    }

  })

  // redisConnection.on("delete:request:*", (message, channel) => {
  //   let requestId = message.requestId;
  // })

  // redisConnection.on("put:request:*", (emssage, channel) => {
  //   let requestId = message.requestId;
  // })

  // redisConnection.on("post:request:*", (message, channel) => {
  //   let request = message.request;
  // })

}

main().catch(err => console.error(err));