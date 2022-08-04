import sslRedirect from "heroku-ssl-redirect";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Connection, ConnectOptions, Mongoose } from "mongoose";
import winston from "winston";
import "winston-mongodb";
import { MongoDBConnectionOptions } from "winston-mongodb";
const app = express();
const port = process.env.PORT || 6444;

dotenv.config();

mongoose.connect(
  "" + process.env.MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

winston.add(
  new winston.transports.MongoDB({
    db: "" + process.env.MONGO_OC,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  })
);

app.use(sslRedirect());
app.use(express.json());
app.listen(port, () => console.log(`Server started on port: ${port}`));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://app.neurobica.online"],
    credentials: true,
  })
);

app.get("/ads", (req, res) => {
  res.json({ mes: "hii" });
});
