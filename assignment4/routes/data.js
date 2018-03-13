const router = require('express').Router();
const data = require('../data');
const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');

const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);
const redisLPush = promisify(client.lpush).bind(client);
const redisLTrim = promisify(client.ltrim).bind(client);
const redisLRange = promisify(client.lrange).bind(client);

const recentList = async recent => {
  await redisLPush('recent20', recent);
  await redisLTrim('recent20', 0, 19);
}

router.get('/history', async (req, res) => {
  const recent20 = await redisLRange('recent20', 0, 19);
  const recent20JSON = recent20.map(recent => JSON.parse(recent));
  res.json(recent20JSON);
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let result = await redisGet(id);
    if (result) {
      await recentList(result);
      res.json(JSON.parse(result));
    } else {
      let result = await data.getById(id);
      const resultString = JSON.stringify(result);
      await redisSet(id, resultString);
      await recentList(resultString);
      res.json(JSON.parse(resultString));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err || 'Internal Error',
      code: 500
    })
  }
})

module.exports = router;