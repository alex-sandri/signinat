export namespace Api
{
    const BASE_ENDPOINT = "http://localhost:3000/api";

    export class Users
    {
        static readonly ENDPOINT = `${BASE_ENDPOINT}/users`;

        static create = async (data: ApiRequest.Users.Create) =>
        {
            const response = await fetch(Users.ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            return response.json();
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