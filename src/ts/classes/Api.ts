export namespace Api
{
    const BASE_ENDPOINT = "localhost:3000/api";

    export class Users
    {
        static readonly ENDPOINT = `${BASE_ENDPOINT}/users`;

        static create = async () =>
        {
            const response = await fetch(Users.ENDPOINT, { method: "POST" });

            return response;
        }
    }
}