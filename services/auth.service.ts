import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { env } from "../utils/myVariables";
import { TokenType } from "../types/types";

let refreshTokens: TokenType[] = [];

class AuthService {
  //  login
  async login(email: string, password: string) {
    try {
      const jwtAccessToken = env.JWT_ACCESS_KEY;
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error("Incorrect email or password");
      }

      const validPassword =
        user && (await bcrypt.compare(password, user.password));

      if (!validPassword) {
        throw new Error("Incorrect email or password");
      }

      if (user && validPassword) {
        //Generate access token
        const jwtAccessToken = env.JWT_ACCESS_KEY;
        const accessToken = jwt.sign(
          {
            id: user._id,
            role: user.role,
            email: user.email,
          },
          jwtAccessToken,
          { expiresIn: "1d" }
        );
        return { accessToken, user };
      }
    } catch (error) {
      throw new Error("Login Failure");
    }
  }
}

export default new AuthService();
