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

    export namespace Sessions
    {
        export interface Create
        {
            email: string,
            password: string,
        }
    }
}