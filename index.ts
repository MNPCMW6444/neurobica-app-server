import express from "express";
const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello Brain");
});

app.listen(process.env.PORT || 6444);
