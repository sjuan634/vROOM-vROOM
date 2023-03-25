const { Schema, model } = require('mongoose');
const imageSchema = require('./Image');
const AdminUser = require('./AdminUser');

const rentalSchema = new Schema(
  {
    rentalType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availability: {
    type: Boolean,
    required: true
  },
  images: [imageSchema],
  rentalOwner: AdminUser,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

rentalSchema.virtual('imageCount').get(function () {
  return this.images.length;
});

const Rental = model('Rental', rentalSchema);

module.exports = Rental;