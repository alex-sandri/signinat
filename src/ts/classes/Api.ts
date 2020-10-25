export namespace Api
{
    const BASE_ENDPOINT = "http://localhost:3000/api";

    export class Users
    {
        static readonly ENDPOINT = `${BASE_ENDPOINT}/users`;

        static create = async (data: ApiRequest.Users.Create) =>
        {
            const response = await fetch(Users.ENDPOINT, { method: "POST", body: JSON.stringify(data) });

            return response;
        }
    }
}

namespace ApiRequest
{
    export namespace Users
    {
        export interface Create
        {
            name: {
                first: string,
                last: string,
            },
            email: string,
            password: string,
        }
    }
}