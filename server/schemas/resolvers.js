const { User, Pet } = require("../models/index");
const { signToken, AuthenticationError } = require("../utils/auth");

const emailValidation = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw AuthenticationError;
        }

        const user = User.findOne({ _id: context.user._id });
        return user;
      } catch (err) {
        console.log(err);
      }
    },

    petById: async (parent, { _id }, context) => {
      try {
        const yes = await Pet.findOne({ _id })
          .populate("user")
          .populate("owner");
        return yes;
      } catch (err) {
        console.log(err);
      }
    },

    allPets: async (parent, args, context) => {
      try {
        const pets = await Pet.find().populate("user");
        return pets;
      } catch (err) {
        console.log(err);
      }
    },

    userEmail: async (parent, { email }, context) => {
      try {
        if (emailValidation.test(email)) {
          const user = await User.findOne({ email });
          return user !== null;
        }
      } catch (error) {
        console.error("Error while checking duplicate email:", error);
        throw error;
      }
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      try {
        const isDuplicateEmail = await User.findOne({ email });

        if (isDuplicateEmail) {
          throw new Error(
            "Email already exists. Please choose a different email."
          );
        }

        if (emailValidation.test(email) && passwordValidation.test(password)) {
          const user = await User.create({
            name,
            email,
            password,
          });
          const token = signToken(user);
          return { token, user };
        } else {
          console.log(
            "Error has occured. Confirm email and/or password format."
          );
        }
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred during user creation.");
      }
    },

    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw AuthenticationError;
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },

    addSeenPet: async (parent, { input }, context) => {
      const { species, sex, breed, colours, message, status, img, lng, lat } =
        input;

      try {
        if (!context.user) {
          throw AuthenticationError;
        }

        const petCreated = await Pet.create({
          species,
          sex,
          breed,
          colours,
          message,
          status,
          img,
          lng,
          lat,
          user: context.user._id,
        });

        const petAdded = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { petsSeen: petCreated },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return petCreated;
      } catch (err) {
        console.log(err);
      }
    },

    addLostPet: async (parent, { input }, context) => {
      const { species, sex, breed, colours, message, status, img, lng, lat } =
        input;

      try {
        if (!context.user) {
          throw AuthenticationError;
        }

        const petCreated = await Pet.create({
          species,
          sex,
          breed,
          colours,
          message,
          status,
          img,
          lng,
          lat,
          user: context.user._id,
        });

        const petAdded = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { petsLost: petCreated },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return petCreated;
      } catch (err) {
        console.log(err);
      }
    },

    removePet: async (parent, { _id }, context) => {
      try {
        if (!context.user) {
          throw AuthenticationError;
        }

        const user = await User.findOne({ _id: context.user._id });

        if (user.petsSeen.includes(_id)) {
          const petRemoved = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { petsSeen: _id } },
            { new: true }
          );
          const petDeleted = await Pet.findOneAndDelete({
            _id: _id,
          });

          return petDeleted;
        } else {
          const petRemoved = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { petsLost: _id } },
            { new: true }
          );
          const petDeleted = await Pet.findOneAndDelete({
            _id: _id,
          });

          return petDeleted;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
