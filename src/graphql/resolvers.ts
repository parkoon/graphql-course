import { User } from "../entity/User";
import { UserInputError } from "apollo-server";

export default {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    register: async (_, args, context, info) => {
      const { username, email, password } = args;

      let errors: any = {};

      try {
        if (email.trim() === "") errors.email = "empty email";
        if (username.trim() === "") errors.username = "empty usename";
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
