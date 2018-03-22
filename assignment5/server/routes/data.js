const router = require('express').Router();
const data = require('../data');
const { promisify } = require('util');

router.get('/:id', async (req, res) => {
  try {
    let send = {
      data: {
        id: req.params.id
      },
      eventName: "get",
    };
    const result = await data.sendMessage(send);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err || 'Internal Error',
      code: 500
    })
  }
})

router.post("/", async (req, res) => {

})

router.delete(":id", async (req, res) => {

})

router.put(":id", async (req, res) => {

})

module.exports = router;