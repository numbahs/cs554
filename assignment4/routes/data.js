const bluebird = require('bluebird');
const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
const data = require('../data');
const functions = data.functions;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/history', async (req, res) => {

});

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  let result = await client.getAsync(id);
  if (result) {
    res.json(result);
  } else {
    let result = await functions.getById(id);
    await client.setAsync(id, JSON.stringify(result));
    res.json(result);
  }
})

module.exports = router;