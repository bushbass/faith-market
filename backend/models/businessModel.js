const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const businesseschema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    addressOne: {
      type: String,
      required: true,
    },
    addressTwo: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    areasServed: {
      type: String,
      required: true,
    },
    isPublished: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Business', businesseschema);
