import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import registerRoute from "./routes/register.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/usersRoute.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
dotenv.config();

app.use("/api/register", registerRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.use(errorHandler);
app.use(notFound);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("App connected to database");
    //* http://localhost:5000
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
