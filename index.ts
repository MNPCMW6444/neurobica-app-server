import express from "express";
const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello Brain");
});

app.listen(6444);
