import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticateRequest } from "../../interface/IAuthenticateRequest";

const verifyUserAuth = (req: AuthenticateRequest, res: Response, next: NextFunction) => {

  const token: string = req.cookies.user_jwt;
  const secret: string = process.env.JWT_SECRET! ;
  if (!token) {

    return res
      .status(401)
      .json({ success: false, message: "Current user is not authenticated!" });

  }

  jwt.verify(token, secret, async (err , decodedUser) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token!" });
    } else {
      // ===============================================================================================================
      (req as any).decodedUser = decodedUser;
      next();
    }
  });
};

export default verifyUserAuth;