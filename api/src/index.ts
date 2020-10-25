import * as express from "express";
import * as cors from "cors";

import { ApiRequest } from "./typings/ApiRequest";

const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/users", (req, res) =>
{
  const user: ApiRequest.Users.Create = req.body;

  // TODO: Validate

  res.send(user);
});

app.listen(3000);