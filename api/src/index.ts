import * as express from "express";
import * as cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/users", (req, res) =>
{
  res.send(req.body);
});

app.listen(3000);