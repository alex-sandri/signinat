export namespace ApiResponse
{
    export namespace Users
    {
        export interface Create
        {
            result: {
                valid: boolean,
            },
            errors: {
                user: {
                    error: string,
                },
                name: {
                    first: {
                        error: string,
                    },
                    last: {
                        error: string,
                    },
                },
                email: {
                    error: string,
                },
                password: {
                    error: string,
                },
            },
        }
    }

    export namespace Sessions
    {
        export interface Create
        {
            result: {
                valid: boolean,
            },
            errors: {
                email: {
                    error: string,
                },
                password: {
                    error: string,
                },
            },
        }
    }
}