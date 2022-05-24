import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

class UserService {
  // create new User
  async create(fullName: string, email: string, password: string) {
    try {
      const exitedUser = await User.findOne({ email: email });
      if (exitedUser) {
        return {
          success: false,
          message: "This email already exists",
        };
      }
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
      return {
        success: false,
        message: "Error while creating user",
      };
    }
  }

  //  Get All Users
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      return {
        success: false,
        message: "Error while searching users",
      };
    }
  }

  //   Get one user
  async findUser(userId: string) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      return {
        success: false,
        message: "Error while searching this user",
      };
    }
  }

  //   Delete User
  async delete(userId: string) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      return {
        success: false,
        message: "Error while deleting this user",
      };
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
      return {
        success: false,
        message: "Error while updating this user",
      };
    }
  }
}

export default new UserService();
