import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";

const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sign-in-at.firebaseio.com",
});

import { ApiRequest } from "./typings/ApiRequest";
import { ApiResponse } from "./typings/ApiResponse";
import { User } from "./models/User";
import { Session } from "./models/Session";

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.post("/api/users", async (req, res) =>
{
  const data: ApiRequest.Users.Create = req.body;

  const response: ApiResponse.Users.Create = {
    result: { valid: true },
    errors: {
      name: { first: { error: "" }, last: { error: "" } },
      email: { error: "" },
      password: { error: "" },
    },
  };

  try
  {
    const user = await User.create(data);

    response.result.data = user.json();
  }
  catch (e)
  {
    const { message } = (e as Error);

    response.result.valid = false;

    switch (message)
    {
      case "user/name/first/empty": response.errors.name.first.error = "empty"; break;
      case "user/name/last/empty": response.errors.name.last.error = "empty"; break;
      case "user/email/empty": response.errors.email.error = "empty"; break;
      case "user/email/already-exists": response.errors.email.error = "already-exists"; break;
      case "user/password/empty": response.errors.password.error = "empty"; break;
      case "user/password/weak": response.errors.password.error = "weak"; break;
    }
  }

  res.send(response);
});

app.get("/api/sessions/:id", async (req, res) =>
{
  const id = req.params.id;

  const session = await Session.retrieve(id);

  if (!session) res.sendStatus(404);
  else res.send(session.json());
});

app.post("/api/sessions", async (req, res) =>
{
  const data: ApiRequest.Sessions.Create = req.body;

  const response: ApiResponse.Sessions.Create = {
    result: { valid: true },
    errors: {
      email: { error: "" },
      password: { error: "" },
    },
  };

  try
  {
    const session = await Session.create(data);

    response.result.data = session.json();
  }
  catch (e)
  {
    const { message } = (e as Error);

    response.result.valid = false;

    switch (message)
    {
      case "user/email/empty": response.errors.email.error = "empty"; break;
      case "user/email/inexistent": response.errors.email.error = "inexistent"; break;
      case "user/password/empty": response.errors.password.error = "empty"; break;
      case "user/password/wrong": response.errors.password.error = "wrong"; break;
    }
  }

  res.send(response);
});

app.delete("/api/sessions/:id", async (req, res) =>
{
  const id = req.params.id;

  await Session.delete(id);

  res.sendStatus(200);
});

app.listen(3000);