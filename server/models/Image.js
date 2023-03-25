const { Schema } = require('mongoose');

const imageSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    }
  },
);

module.exports = imageSchema;
