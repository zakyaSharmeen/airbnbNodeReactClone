import genToken from "../config/token.js";
import UserModel from "../model/UserModel.js";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let excistUser = await UserModel.findOne({ email });
    if (excistUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    let user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    console.log("User created:", user);
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({
      message: "Server error from auth controller- signup",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    // let user = await UserModel.findOne({ email }).populate(
    //   "listing",
    //   "title image1 image2 image3 description rent category city landMark",
    // );
    let user = await UserModel.findOne({ email });
    console.log("Email from req:", email);
    // const allUsers = await UserModel.find();
    // console.log("All users:", allUsers);
    if (!user) {
      return res.status(400).json({ message: "User is not exist" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect Password" });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error}` });
  }
};
