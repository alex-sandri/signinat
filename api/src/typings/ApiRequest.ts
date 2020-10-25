export namespace ApiRequest
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