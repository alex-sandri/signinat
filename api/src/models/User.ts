import { firestore } from "firebase-admin";
import * as bcrypt from "bcrypt";

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
        public email: string,
        public password: string,
    ) {}

    static create = async (data: ApiRequest.Users.Create): Promise<User> =>
    {
        User.validate(data);

        if (await User.exists(data.email)) throw new Error("user/email/already-exists");

        data.password = bcrypt.hashSync(data.password, 15);

        const user = await db.collection("users").add(<IUser>data);

        return new User(
            user.id,
            data.name.first,
            data.name.last,
            data.email,
            data.password,
        );
    }

    static retrieve = async (id: string): Promise<User | null> =>
    {
        const user = await db.collection("users").doc(id).get();

        if (!user.exists) return null;

        const data = user.data() as IUser;

        return new User(
            id,
            data.name.first,
            data.name.last,
            data.email,
            data.password,
        );
    }

    static delete = async (id: string): Promise<void> => { await db.collection("users").doc(id).delete(); }

    static withEmail = async (email: string): Promise<User | null> =>
    {
        const result = (await db.collection("users").where("email", "==", email).limit(1).get());

        if (result.empty) return null;

        const user = result.docs[0];

        return User.retrieve(user.id);
    }

    static exists = async (email: string): Promise<boolean> => (await User.withEmail(email)) !== null;

    /**
     * @throws `Error` if data is not valid
     */
    static validate = (data: ApiRequest.Users.Create): void =>
    {
        if (data.name.first.length === 0) throw new Error("user/name/first/empty");

        if (data.name.last.length === 0) throw new Error("user/name/last/empty");

        if (data.email.length === 0) throw new Error("user/email/empty");

        if (data.password.length === 0) throw new Error("user/password/empty");
        else if (data.password.length < 8) throw new Error("user/password/weak");
    }
}