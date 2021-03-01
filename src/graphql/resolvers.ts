import { UserInputError, AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import { Not } from "typeorm";

export default {
  Query: {
    getUsers: async (_, __, context) => {
      try {
        let user: any;
        if (context.req && context.req.headers.authorization) {
          const token = context.req.headers.authorization.split("Bearer ")[1];

          const decodedToken = jwt.verify(token, "JWT_SECRET");

          if (!decodedToken) {
            throw new AuthenticationError("unauthenticated");
          }

          user = decodedToken;
        }

        const users = await User.find({
          where: {
            username: Not(user.username),
          },
        });
        return users;
      } catch (err) {
        throw err;
      }
    },

    login: async (_, args) => {
      const { username, password } = args;
      let errors: any = {};

      try {
        if (username.trim() === "") errors.email = "empty email";
        if (password.trim() === "") errors.password = "empty password";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("bad input", { errors });
        }

        const user = await User.findOne({ where: { username } });

        if (!user) {
          errors.username = "user not found";
          throw new UserInputError("user not found", { errors });
        }

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("user not found", { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "password is incorrect";
          throw new AuthenticationError("password is incorrect");
        }

        const token = jwt.sign({ username }, "JWT_SECRET", {
          expiresIn: 60 * 60,
        });

        return {
          ...user,
          token,
          createdAt: user.createdAt.toISOString(),
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  Mutation: {
    register: async (_, args, context, info) => {
      const { username, email, password } = args;

      let errors: any = {};

      try {
        if (email.trim() === "") errors.email = "empty email";
        if (username.trim() === "") errors.username = "empty username";
        if (password.trim() === "") errors.password = "empty password";

        const userByEmail = await User.findOne({ email });
        const userByUsername = await User.findOne({ username });

        if (userByEmail) errors.email = "email is taken";
        if (userByUsername) errors.username = "username is taken";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        const user = new User({ username, email, password });
        await user.save();

        return user;
        // Return user
      } catch (err) {
        // TODO. 500 에러 처리! (ex, 중복처리가 제대로 되지 않은 상태였다면, 디비 에러가 발생했을 것이다.)
        throw new UserInputError("bad input", { errors: err });
      }
    },
  },
};
