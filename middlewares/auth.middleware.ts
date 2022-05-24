const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { env } from "../utils/myVariables";
import { DecodeType } from "../types/types";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      success: false,
      message: "Access Token not found",
    });
  }

  try {
    const jwtAccessToken = env.JWT_ACCESS_KEY;
    jwt.verify(token, jwtAccessToken, (err: any, decoded: DecodeType) => {
      if (err) {
        return res.json("Internal Server Error");
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

const verifyTokenAndAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      success: false,
      message: "Access Token not found",
    });
  }

  try {
    const jwtAccessToken = env.JWT_ACCESS_KEY;
    const decoded = jwt.verify(token, jwtAccessToken);
    if (decoded.role === "admin") {
      next();
    } else {
      res.json("You are not allowed to do that");
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      success: false,
      message: "Access Token not found",
    });
  }

  try {
    const jwtAccessToken = env.JWT_ACCESS_KEY;
    jwt.verify(token, jwtAccessToken, (err: any, decoded: any) => {
      if (err) {
        return res.json("Internal Server Error");
      } else {
        if ((res.locals.jwt = decoded || decoded.role === "admin")) next();
      }
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
