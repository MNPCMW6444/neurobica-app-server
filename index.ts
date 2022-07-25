import express from "express";
import enforce from "express-sslify";

const app = express();

app.use(enforce.HTTPS());

app.get("/", (req: any, res: any) => {
  res.send("Hello Brain");
});

app.listen(process.env.PORT || 6444);
