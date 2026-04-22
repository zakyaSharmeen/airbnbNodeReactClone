import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const isAuth = (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - not have token" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - not have validation" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "isAuth error", error: err.message });
  }
};
