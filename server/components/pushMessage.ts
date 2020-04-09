const webPush = require('web-push');

/**
 * 向push service推送信息
 * @param {*} subscription
 * @param {*} data
 */
export const pushMessage = (subscription, data = {}) => {
  webPush
    .sendNotification(subscription, data)
    .then(data => {
      console.log('push service的相应数据:', JSON.stringify(data));
      return;
    })
    .catch(err => {
      // 判断状态码，440和410表示失效
      if (err.statusCode === 410 || err.statusCode === 404) {
        // return util.remove(subscription);
      } else {
        console.log(subscription);
        console.log(err);
      }
    });
};
