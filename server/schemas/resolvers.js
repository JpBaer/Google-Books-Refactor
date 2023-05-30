//getSingleUser
//CreateUser
//Login
//saveBook
//deleteBook

const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
        
            return userData;
          }
        
          throw new AuthenticationError('Not logged in');
        }

    },

    Mutation: {
        addUser: async(parent, { username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user };
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user){
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, {authors, description, bookId, image, link, title},{user}) => {
            return User.findOneAndUpdate(
                {
                    _id: user._id
                },
                {
                    $addToSet: { savedBooks : {authors, description, bookId, image, link, title}},

                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeBook: async (parent,{bookId},{user}) => {
            if(user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: user._id},
                    {$pull: {savedBooks: {bookId: bookId}}},
                    {new: true,
                    runValidators: true}
                );   
            return updatedUser
                    }
                throw new AuthenticationError('You need to be logged in!')
         },
    },
};

module.exports = resolvers;