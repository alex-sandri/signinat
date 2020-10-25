import * as express from "express";
import * as cors from "cors";

import { ApiRequest } from "./typings/ApiRequest";
import { ApiResponse } from "./typings/ApiResponse";

const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/users", (req, res) =>
{
  const user: ApiRequest.Users.Create = req.body;

  const response: ApiResponse.Users.Create = {
    result: { valid: true },
    errors: {
      name: { first: { error: "" }, last: { error: "" } },
      email: { error: "" },
      password: { error: "" },
    },
  };

  if (user.name.first.length === 0) response.errors.name.first.error = "empty";

  if (user.name.last.length === 0) response.errors.name.last.error = "empty";

  if (user.email.length === 0) response.errors.email.error = "empty";

  if (user.password.length === 0) response.errors.password.error = "empty";

  if (
    response.errors.name.first.error.length > 0
    || response.errors.name.last.error.length > 0
    || response.errors.email.error.length > 0
    || response.errors.password.error.length > 0
  ) response.result.valid = false;

  res.send(response);
});

app.post("/api/sessions", (req, res) =>
{
  const credentials: ApiRequest.Sessions.Create = req.body;

  // TODO: Validate

  res.send(credentials);
});

app.listen(3000);