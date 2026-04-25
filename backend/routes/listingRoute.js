import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { addListing } from "../controllers/listingController.js";

let listingRouter = express.Router();

listingRouter.post(
  "/add",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log("ROUTE HIT");
    next();
  },
  addListing,
);

export default listingRouter;
