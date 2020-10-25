import * as express from "express";

const app = express();

app.post("/api/users", (req, res) =>
{
  console.log(req.body);
});

app.listen(3000);