var express = require('express');
var router = express.Router();
var Subscription = require('../storage/model/subscriptions');

const webPush = require('web-push');

/**
 * 向push service推送信息
 * @param {*} subscription
 * @param {*} data
 */
const pushMessage = (subscription, data = {}) => {
  webPush
    .sendNotification(subscription, data)
    .then(data => {
      // console.log('push service的相应数据:', JSON.stringify(data));
      return;
    })
    .catch(err => {
      // 判断状态码，440和410表示失效
      if (err.statusCode === 410 || err.statusCode === 404) {
        console.log('push fail');
      } else {
        console.log(subscription);
        console.log(err);
      }
    });
};

router.post('/', async (req, res) => {
  try {
    const payload = req.body.payload;
    const subscriptions = await Subscription.find();

    for (let i = 0; i < subscriptions.length; i++) {
      let { subscription } = subscriptions[i];
      pushMessage(subscription, JSON.stringify(payload));
    }
    res.json({
      errCode: 0,
      data: '成功发送',
    });
  } catch (err) {
    res.json({
      errCode: 1,
      message: err.message,
    });
  }
});

module.exports = router;
