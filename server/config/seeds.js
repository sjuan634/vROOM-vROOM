const db = require('./connection');

const { Property, User } = require('../models');
const bcrypt = require('bcrypt')

db.once('open', async () => {

    // Delete all existing users and properties
    await User.deleteMany({});
    await Property.deleteMany({});

    // Create a new user
    const user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: "password123",
        isAdmin: true,
    });
    const user2 = await User.create({
        firstName: 'Emily',
        lastName: 'Smith',
        email: 'emily@example.com',
        password: "password123",
        isAdmin: false,
    });

    // Create some properties owned by the user
    const properties = await Property.insertMany([
        {
            user_id: user._id,
            name: 'Beach House',
            images: ['https://cdn.onekindesign.com/wp-content/uploads/2017/01/Beach-House-Design-Brandon-Architects-04-1-Kindesign.jpg', 'https://cdn.onekindesign.com/wp-content/uploads/2017/01/Beach-House-Design-Brandon-Architects-05-1-Kindesign.jpg'],
            night_cost: 370,
            isAvailable: false,
            room: true,
            house: false,
            max_guests: 3,
            bed_number: 3,
            bath_number: 2,
            startDate: new Date('12-04-2021'),
            endDate: new Date('6-01-2024'),
            location: {
                type: 'Point',
                coordinates: [33.9850, 118.4695 ],
            },
            address: '256 Main St, California',
            description: 'House with great view and affordable price',
        },
        {
            user_id: user._id,
            name: 'Pent House',
            images: ['https://cdn.decoist.com/wp-content/uploads/2014/10/Open-floor-living-area-of-the-penthouse-in-Milan-Condominium.jpg', 'https://cdn.decoist.com/wp-content/uploads/2014/10/A-dining-room-with-spectacular-views-all-around.jpg'],
            night_cost: 560,
            isAvailable: true,
            room: false,
            house: true,
            max_guests: 6,
            bed_number: 3,
            bath_number: 2,
            startDate: new Date('12-04-2012'),
            endDate: new Date('6-01-2012'),
            location: {
                type: 'Point',
                coordinates: [ 40.7128,74.0060 ],
            },
            address: '221 Fella St, NY',
            description: 'Pent house with great view',
        },
    ]);

    console.log(`User ${user.email} created with properties:`);
    console.log(properties);

    // Close the database connection
    db.close();
});
