const router = require('express').Router();
const data = require('../data');
const { promisify } = require('util');

let send = async (eventName, req, res) => {
  try {
    let send = {
      data: {
        id: req.params.id,
        body: req.body
      },
      eventName
    };
    let result = await data.sendMessage(send);
    return result;
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err || 'Internal Error',
      code: 500
    });
  }
};

router.get('/:id', async (req, res) => {
  let result = await send('get', req, res);
  res.json(result);
});

router.post('/', async (req, res) => {
  let result = await send('post', req, res);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  let result = await send('delete', req, res);
  res.json(result);
});

router.put('/:id', async (req, res) => {
  let result = await send('put', req, res);
  res.json(result);
});

module.exports = router;
