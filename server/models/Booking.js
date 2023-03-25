const { Schema, model } = require('mongoose');
const User = require('./User');
const Rental = require('./Rental');

const bookingSchema = new Schema(
  {
    rental: Rental,
    user: User,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
);

const Booking = model('Booking', bookingSchema);

module.exports = Booking;