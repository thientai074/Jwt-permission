import { Request, Response } from "express";
import { TokenType } from "../types/types";
import AuthService from "../services/auth.service";

let refreshTokens: TokenType[] = [];

class authController {
  // Login User
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({
          success: false,
          message: "Missing email or password",
        });
      }
      const user = await AuthService.login(email, password);
      res.json({
        success: true,
        user,
        message: "Logged in successfully",
      });
    } catch (error: any) {
    
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new authController();
