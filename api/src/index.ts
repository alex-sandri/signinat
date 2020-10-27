import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sign-in-at.firebaseio.com",
});

import { ApiRequest } from "./typings/ApiRequest";
import { ApiResponse } from "./typings/ApiResponse";
import { User } from "./models/User";

const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/users", async (req, res) =>
{
  const user: ApiRequest.Users.Create = req.body;

  const response: ApiResponse.Users.Create = {
    result: { valid: true },
    errors: {
      user: { error: "" },
      name: { first: { error: "" }, last: { error: "" } },
      email: { error: "" },
      password: { error: "" },
    },
  };

  try
  {
    await User.create(user);
  }
  catch (e)
  {
    const { message } = (e as Error);

    response.result.valid = false;

    switch (message)
    {
      case "user/already-exists": response.errors.user.error = "already-exists"; break;
      case "user/name/first/empty": response.errors.name.first.error = "empty"; break;
      case "user/name/last/empty": response.errors.name.last.error = "empty"; break;
      case "user/email/empty": response.errors.email.error = "empty"; break;
      case "user/password/empty": response.errors.password.error = "empty"; break;
      case "user/password/weak": response.errors.password.error = "weak"; break;
    }
  }

  res.send(response);
});

app.post("/api/sessions", (req, res) =>
{
  const credentials: ApiRequest.Sessions.Create = req.body;

  const response: ApiResponse.Sessions.Create = {
    result: { valid: true },
    errors: {
      email: { error: "" },
      password: { error: "" },
    },
  };

  if (credentials.email.length === 0) response.errors.email.error = "empty";

  if (credentials.password.length === 0) response.errors.password.error = "empty";

  if (response.errors.email.error.length > 0
    || response.errors.password.error.length > 0
  ) response.result.valid = false;

  res.send(response);
});

app.listen(3000);