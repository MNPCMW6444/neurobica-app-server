import sslRedirect from "heroku-ssl-redirect";
import express from "express";
const app = express();

app.use(sslRedirect());

app.get("/", (req, res) => {
  res.send("hello brain dead of m");
});

app.listen(process.env.PORT || 3000);
