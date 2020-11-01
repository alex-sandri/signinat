import { firestore } from "firebase-admin";
import * as bcrypt from "bcrypt";

import { ApiRequest } from "../typings/ApiRequest";
import { ApiError } from "./ApiError";

const db = firestore();

interface IApp
{
    name: string,
    url: string,
    email: string,
    password: string,
    api: {
        key: string,
    },
}

export interface ISerializedApp
{
    id: string,
    name: string,
    url: string,
    email: string,
}

export class App
{
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly url: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    public json = (): ISerializedApp =>
    ({
        id: this.id,
        name: this.name,
        url: this.url,
        email: this.email,
    });

    static create = async (data: ApiRequest.Apps.Create): Promise<App> =>
    {
        App.validate(data);

        if (await App.exists(data.email)) throw new ApiError("app/email/already-exists");

        data.password = bcrypt.hashSync(data.password, 15);

        const app = await db.collection("apps").add(<IApp>data);

        return new App(
            app.id,
            data.name,
            data.url,
            data.email,
            data.password,
        );
    }

    static retrieve = async (id: string): Promise<App | null> =>
    {
        const app = await db.collection("apps").doc(id).get();

        if (!app.exists) return null;

        const data = app.data() as IApp;

        return new App(
            id,
            data.name,
            data.url,
            data.email,
            data.password,
        );
    }

    static delete = async (id: string): Promise<void> => { await db.collection("apps").doc(id).delete(); }

    static withEmail = async (email: string): Promise<App | null> =>
    {
        const result = (await db.collection("apps").where("email", "==", email).limit(1).get());

        if (result.empty) return null;

        const app = result.docs[0];

        return App.retrieve(app.id);
    }

    static exists = async (email: string): Promise<boolean> => (await App.withEmail(email)) !== null;

    /**
     * @throws `Error` if data is not valid
     */
    static validate = (data: ApiRequest.Apps.Create): void =>
    {
        if (data.name.length === 0) throw new ApiError("app/name/empty");

        if (data.url.length === 0) throw new ApiError("app/url/empty");

        if (data.email.length === 0) throw new ApiError("app/email/empty");

        if (data.password.length === 0) throw new ApiError("app/password/empty");
        else if (data.password.length < 8) throw new ApiError("app/password/weak");
    }
}