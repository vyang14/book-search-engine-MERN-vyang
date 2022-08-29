const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async () => {
      return User.find({});
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(User);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email, password });
      
      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }
      70
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in.')
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookData } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in.')
    
    },


  },
};

module.exports = resolvers;