import express from "express";
const app = express();

app.get("/yoad", (req: any, res: any) => {
  res.send("Hello Brain");
});

app.listen(6444);
