const mongoose = require("mongoose");

const PERIOD_MONTHLY = "monthly";

const STATUS_ACTIVE = "A";
const STATUS_DISABLED = "D";

const featuresSchema = new mongoose.Schema({
  videos: Boolean,
  audio: Boolean,
  download: Boolean,
  streaming: Boolean,
  customize: Boolean,
});

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    required: true,
    default: PERIOD_MONTHLY,
  },
  status: {
    type: String,
    enum: [STATUS_ACTIVE, STATUS_DISABLED],
    default: STATUS_ACTIVE,
  },
  features: featuresSchema,
});

const model = mongoose.model("Plan", schema);

module.exports = { model, schema };
