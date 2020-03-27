var mongoose = require('../connect');

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    subscription: Object,
    client: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('clients', subscriptionSchema);
