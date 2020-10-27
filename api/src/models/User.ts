import { firestore } from "firebase-admin";

import { ApiRequest } from "../typings/ApiRequest";

const db = firestore();

interface IUser
{
    name: {
        first: string,
        last: string,
    },
    email: string,
    password: string,
}

export class User
{
    private constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string
    ) {}

    static create = async (data: ApiRequest.Users.Create): Promise<User> =>
    {
        // TODO: Encrypt password

        const user = await db.collection("users").add(data);

        return new User(
            user.id,
            data.name.first,
            data.name.last,
            data.email,
        );
    }

    static retrieve = async (id: string): Promise<User> =>
    {
        const user = await db.collection("users").doc(id).get();

        const data = user.data() as IUser;

        return new User(
            id,
            data.name.first,
            data.name.last,
            data.email,
        );
    }

    static delete = async (id: string): Promise<void> => { await db.collection("users").doc(id).delete(); }
}