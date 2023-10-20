const mongoose = require("mongoose");

const PAYMENT_PLATFORM_STRIPE = "Stripe";
const PAYMENT_PLATFORM_PAYPAL = "Paypal";

const paymentPlatformSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  external_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    enum: [PAYMENT_PLATFORM_STRIPE, PAYMENT_PLATFORM_PAYPAL],
  },
});

const schema = mongoose.Schema({
  business_id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  paymentPlatform: paymentPlatformSchema,
});

const model = mongoose.model("Subscription", schema);

module.exports = {
  model,
  schema,
  PAYMENT_PLATFORM_STRIPE,
  PAYMENT_PLATFORM_PAYPAL,
};
