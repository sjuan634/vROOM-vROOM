const { AuthenticationError } = require('apollo-server-express');
const { User, Property } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate('properties');
                return user;
            }
            throw new AuthenticationError('Not logged in');
        },
        property: async (parent, { _id }) => {
            return Property.findById(_id);
        },
        properties: async () => {
            return Property.find();
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (user.isAdmin) {

                throw new AuthenticationError('Unauthorized');
            }
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        signupAdmin: async (parent, args) => {
            const user = await User.create({ ...args, isAdmin: true });
            const token = signToken(user);
            return { token, user };
        },
        adminLogin: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            if (!user.isAdmin) {
                throw new AuthenticationError('Unauthorized');
            }
            const token = signToken(user);
            return { token, user };
        },
        addProperty: async (parent, args, context) => {
            if (context.user && context.user.isAdmin) {
                const property = await Property.create({
                    user_id: args.user_id,
                    images: args.images,
                    night_cost: args.night_cost,
                    available_date: args.available_date,
                    room: args.room,
                    house: args.house,
                    max_guests: args.max_guests,
                    bed_number: args.bed_number,
                    bath_number: args.bath_number,
                    location: args.location,
                    address: args.address,
                    description: args.description
                });
                await User.findByIdAndUpdate(args.user_id, { $push: { properties: property } });
                return property;
            }
            throw new AuthenticationError('Not logged in or Unauthorized');
        },

        updateProperty: async (parent, input, context) => {
            if (context.user && context.user.isAdmin) {
                const { _id, ...updates } = input;
                const property = await Property.findByIdAndUpdate(_id, updates, { new: true });
                if (property) {
                    return property;
                }
                throw new Error('Property not found');
            }
            throw new AuthenticationError('Not logged in or Unauthorized');
        },



        deleteProperty: async (parent, { _id }, context) => {
            // if (context.user) {
            const property = await Property.findByIdAndDelete(_id);
            if (property) {
                await User.findByIdAndUpdate(context.user._id, { $pull: { properties: _id } });
                return property;
            }
            throw new Error('Property not found');
            // }
            // throw new AuthenticationError('Not logged in');
        }
    }
};

module.exports = resolvers
