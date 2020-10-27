import { firestore } from "firebase-admin";

import { ApiRequest } from "../typings/ApiRequest";
import { User } from "./User";

const db = firestore();

interface ISession
{
    user: string
}

export class Session
{
    private constructor(
        public id: string,
        public user: User,
    ) {}

    static create = async (data: ApiRequest.Sessions.Create): Promise<Session> =>
    {
        Session.validate(data);

        // TODO
    }

    static retrieve = async (id: string): Promise<Session | null> =>
    {
        const session = await db.collection("sessions").doc(id).get();

        if (session === null) return null;

        const data = session.data() as ISession;

        return new Session(
            session.id,
            (await User.retrieve(data.user)) as User,
        );
    }

    static delete = async (id: string): Promise<void> => { await db.collection("sessions").doc(id).delete(); }

    static exists = async (id: string): Promise<boolean> => (await Session.retrieve(id)) !== null;

    /**
     * @throws `Error` if data is not valid
     */
    static validate = (data: ApiRequest.Sessions.Create): void =>
    {
        if (data.email.length === 0) throw new Error("user/email/empty");

        if (data.password.length === 0) throw new Error("user/password/empty");
    }
}