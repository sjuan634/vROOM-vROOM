const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    bookedFor: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
});

const Bookings = mongoose.model('booking', bookingsSchema);

module.exports = Bookings;