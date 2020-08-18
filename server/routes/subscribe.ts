var express = require('express');
var router = express.Router();
var Subscription = require('../storage/model/subscriptions');

router.post('/', async (req, res) => {
  let subscription = req.body.subscription;
  let client = req.body.client;

  const result = await Subscription.findOneAndUpdate({ subscription, client });

  if (!result) {
    await new Subscription({ subscription, client }).save();
  }
  res.json({
    status: 0,
    message: 'ok',
  });
});

module.exports = router;
