import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

class UserService {
  // create new User
  async create(fullName: string, email: string, password: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = await new User({
        fullName,
        email,
        password: hashed,
      });

      const user = await newUser.save();
      return user;
    } catch (error) {
      throw Error("Error while creating user");
    }
  }

  //  Get All Users
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw Error("Error while getting users");
    }
  }

  //   Get one user
  async findUser(userId: string) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw Error("Error while finding user");
    }
  }

  //   Delete User
  async delete(userId: string) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw Error("Error while deleting user");
    }
  }

  //   Update User
  async update(userId: string, body: any) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: body,
        },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      throw Error("Error while updating user");
    }
  }
}

export default new UserService();
