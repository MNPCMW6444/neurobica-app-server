import sslRedirect from "heroku-ssl-redirect";
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 6444;

app.use(sslRedirect());
app.listen(port, () => console.log(`Server started on port: ${port}`));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://app.neurobica.online"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello brain dead of m");
});
