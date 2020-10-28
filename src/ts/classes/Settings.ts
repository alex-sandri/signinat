export class Settings
{
    static get = (key: string) => localStorage.getItem(key);

    static set = (key: string, value: string) => localStorage.setItem(key, value);

    static delete = (key: string) => localStorage.removeItem(key);

    static clear = () => localStorage.clear();
}