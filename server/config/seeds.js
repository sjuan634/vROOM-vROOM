const db = require('./connection');
const { User, Property } = require('../models');

db.once('open', async () => {
  await Property.deleteMany();

  const properties = await Property.insertMany([
    {
        user_id: User.Types.ObjectId,
        images: 'house1.jpg',
        night_cost: 225,
        available_date: Date.now,
        house: true,
        max_guests: 6,
        bed_number: 3,
        bath_number: 4, 
        location: 'Boston, MA',
        address: '456 Rainbow Ln',
        description: 'Two-story house with pool and outdoor dining spaces.'
    },
    {
        user_id: User.Types.ObjectId,
        images: 'house2.jpg',
        night_cost: 275,
        available_date: Date.now,
        house: true,
        max_guests: 10,
        bed_number: 5,
        bath_number: 6, 
        location: 'Palm Springs, CA',
        address: '789 Flamingo Ave',
        description: 'Spacious house with huge yard and pool.'

    },
    {
        user_id: User.Types.ObjectId,
        images: 'house3.jpg',
        night_cost: 250,
        available_date: Date.now,
        house: true,
        max_guests: 6,
        bed_number: 3,
        bath_number: 4, 
        location: 'San Diego, CA',
        address: '1090 Hillcrest Blvd',
        description: 'Great home near the beach with plenty of parking!'

    },
    {
        user_id: User.Types.ObjectId,
        images: 'house4.jpg',
        night_cost: 350,
        available_date: Date.now,
        house: true,
        max_guests: 8,
        bed_number: 4,
        bath_number: 5, 
        location: 'New York City, NY',
        address: '1245 Main St',
        description: 'Huge town house with plenty of space for entertaining.'

    },
    {
        user_id: User.Types.ObjectId,
        images: 'house5.jpg',
        night_cost: 400,
        available_date: Date.now,
        house: true,
        max_guests: 12,
        bed_number: 6,
        bath_number: 7, 
        location: 'Aspen, CO',
        address: '725 Snowflake Ln',
        description: 'Great vacation spot near tons of slopes!'

    },
    {
        user_id: User.Types.ObjectId,
        images: 'house6.jpg',
        night_cost: 200,
        available_date: Date.now,
        house: true,
        max_guests: 4,
        bed_number: 2,
        bath_number: 3, 
        location: 'Austin, TX',
        address: '684 Longhorn Dr',
        description: 'Modern home close to Dirty Sixth!'

    },
    {
        user_id: User.Types.ObjectId,
        images: 'house7.jpg',
        night_cost: 190,
        available_date: Date.now,
        house: true,
        max_guests: 8,
        bed_number: 4,
        bath_number: 5, 
        location: 'Nashville, TN',
        address: '569 Yeehaw Blvd',
        description: 'Perfect home for Spring Break with spacious entertainment areas and huge yard!'

    },
    {
        user_id: User.Types.ObjectId,
        images: 'house8.jpg',
        night_cost: 200,
        available_date: Date.now,
        house: true,
        max_guests: 8,
        bed_number: 4,
        bath_number: 5, 
        location: 'Los Angeles, CA',
        address: '123 Orange Dr',
        description: 'Two-story house with pool, deck, and balconies.'
    },
    {
        user_id: User.Types.ObjectId,
        images: 'house9.jpg',
        night_cost: 175,
        available_date: Date.now,
        house: true,
        max_guests: 6,
        bed_number: 3,
        bath_number: 4, 
        location: 'Mammoth Lakes, CA',
        address: '420 Oregano Pl',
        description: 'Perfect ski getaway for the family.'
    }
  ]);

  console.log('properties seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    isAdmin: true,
    properties: [
      {
        properties: [properties[1]._id, properties[2]._id, properties[7]._id, properties[8]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    isAdmin: false,
  });

  console.log('users seeded');

  process.exit();
});