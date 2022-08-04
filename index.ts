import sslRedirect from "heroku-ssl-redirect";
import express, { Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import winston from "winston";
import "winston-mongodb";
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
    console.log("Connected to Main MongoDB");
  }
);

const mongoTransport = winston.add(
  new winston.transports.MongoDB({
    db: "" + process.env.MONGO_OC,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  })
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [mongoTransport],
});

app.use(sslRedirect());
app.use(express.json());
app.listen(port, () => console.log(`Server started on port: ${port}`));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://app.neurobica.online"],
    credentials: true,
  })
);

const logReq = (req: Request<{}, any, any, Record<string, any>>) =>
  logger.log({
    level: "warn",
    message:
      "Req: " +
      JSON.stringify({
        headers: req.headers,
        method: req.method,
        url: req.url,
        httpVersion: req.httpVersion,
        body: req.body,
        cookies: req.cookies,
        path: req.path,
        protocol: req.protocol,
        query: req.query,
        hostname: req.hostname,
        ip: req.ip,
        originalUrl: req.originalUrl,
        params: req.params,
      }),
  });

app.get("/asd", (req, res) => {
  logReq(req);
  res.json({ mes: "hiiasd" });
});
