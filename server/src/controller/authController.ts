import { NextFunction, Request, Response } from "express";
import { generateOtp } from "../utils/generateOtp";
import { sendOtpFun } from "../utils/sendOtpFun";
import Otp from "../models/otpSchema";
import User from "../models/userSchema";
import { hashPassword } from "../utils/hashPass";
import { generateToken } from "../utils/generateJwtToken";
import { comparePasswords } from "../utils/passwordCompare";
import { AuthenticateRequest } from "../interface/IAuthenticateRequest";

//auth controller
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res 
          .json({ message: "Email already in use", success: false });
      }

    const otpGenerated = generateOtp(); //generating otp
    sendOtpFun(email, otpGenerated); //sending otp to the user
    const result = await Otp.create({
      email: email,
      otp: otpGenerated,
    });
    res.status(201).json({ message: "OTP generated and saved", success: true });
  } catch (err: unknown) {
    console.log("Error in the auth controller :", err);
    res
      .status(500)
      .json({ message: "error in sending otp , try again later " });
  }
};





export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, otpByUser } = req.body;


    //find otp with this email
    const { otp }: any = await Otp.find({ email: email });

    if (otp !== otpByUser) {
      return res.json({ message: "otp is not matching ", success: false });
    }

    const hashedPass = await hashPassword(password);

    const result = await User.create({
      email: email,
      name: name,
      password: hashedPass,
    });

    //setting token
    let payload = {
      email: email!,
    };

    const token = generateToken(payload);

    res.cookie("user_jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ message: "user created successfully ", success: true });
  } catch (err: unknown) {
    console.log("Error in the auth controller :", err);
    res.status(500).json({ message: "error in signup , try again later " });
  }
};






//login controller

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findUser: any = await User.findOne({ email: email });
    //case 1 - user is not registered
    if (!findUser) {
      return res.json({
        message: "no user with this email address , please sign up",
        success: false,
      });
    }

    //case 2 password checking
    const passCheck = await comparePasswords(password, findUser.password);
    if (!passCheck) {
      return res.json({
        message: "email or password is incorrect, Try again ",
        success: false,
      });
    }

    //if all are perfect
    //setting token
    let payload = {
      email: email!,
    };

    const token = generateToken(payload);

    res.cookie("user_jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "user Logged Successfully ", success: true });
  } catch (err: unknown) {
    console.log("Error in the auth controller :", err);
    res
      .status(500)
      .json({ message: "error in login , try again later " });
  }
};


//auth check
export const checkAuth = ( req : AuthenticateRequest , res : Response)=>{
    res.status(200).json({success:true , isAuthenticated: true , user : req.decodedUser })
}