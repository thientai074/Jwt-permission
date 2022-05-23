import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { env } from "../utils/myVariables";
import {TokenType, UserType } from "../types/types"

let refreshTokens: TokenType[] = [];

class authController {
  generateAccessToken(user: UserType) {
    const jwtAccessToken = env.JWT_ACCESS_KEY;
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      jwtAccessToken,
      { expiresIn: "15m" }
    );
  }

  generateRefreshToken(user: UserType) {
    const jwtAccessToken = env.JWT_ACCESS_KEY;
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      jwtAccessToken,

      { expiresIn: "365d" }
    );
  }

  async login(req: Request, res: Response) {
    try {
      const jwtAccessToken = env.JWT_ACCESS_KEY;
      const user = await User.findOne({ email: req.body.email });
      console.log("jwtAccessToken", jwtAccessToken);

      if (!user) {
        return res.json("Incorrect username");
      }

      const validPassword =
        user && (await bcrypt.compare(req.body.password, user.password));

      if (!validPassword) {
        return res.json("Incorrect password");
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
        res.json({accessToken, user});
      }
    } catch (err) {
      res.json(err);
    }
  }

  async requestRefreshToken(req: Request, res: Response) {
    const jwtAccessToken = env.JWT_ACCESS_KEY;
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, jwtAccessToken, (err: any, user: any) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter(
        (token: TokenType) => token !== refreshToken
      );
      //create new access token, refresh token and send to user
      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);
      // refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  }
}

export default new authController();
