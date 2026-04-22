import express from "express";
import { login, logOut, SignUp } from "../controllers/authController.js";

const authrouter = express.Router();
authrouter.post("/signup", SignUp);
authrouter.post("/login", login);
authrouter.post("/logout", logOut);

export default authrouter;
