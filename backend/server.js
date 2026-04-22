import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authrouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
dotenv.config({ quiet: true });

let port = process.env.PORT || 5000;
let app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authrouter);

app.listen(port, () => {
  connectDb();
  console.log(`Server is running on port -http//localhost:${port}`);
});
