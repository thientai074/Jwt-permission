import { User } from "../models/user.model";
import { Request, Response } from "express";
import UserService from "../services/user.service";

class userController {
  // create User
  async createUser(req: Request, res: Response) {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.json({
        success: false,
        message: "Missing name or email or password",
      });
    }
    try {
      const user = await UserService.create(fullName, email, password);
      res.json({
        success: true,
        message: "Created user successfully",
        user,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }

  // GetAllUsers
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.json({
        success: true,
        users,
        message: "Getted all users successfully",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }

  // find User
  async findUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await UserService.findUser(userId);
      res.json({
        success: true,
        user,
        message: "Getted user successfully",
      });
    } catch (error) {
      res.json({
        success: false,
        message: error,
      });
    }
  }

  // Remove user
  async removeUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const deletedUser = await UserService.delete(userId);
      res.json({
        success: true,
        deletedUser,
        message: "Deleted user successfully",
      });
    } catch (error) {
      res.json({
        success: false,
        message: error,
      });
    }
  }

  // update user
  async updateUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const userId = req.params.id;
      const updatedUser = await UserService.update(userId, body);
      res.json({
        success: true,
        updatedUser,
        message: "Updated user successfully",
      });
    } catch (error) {
      res.json({
        success: false,
        message: error,
      });
    }
  }
}

export default new userController();
