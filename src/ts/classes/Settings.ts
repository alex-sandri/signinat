export class Settings
{
    static get = (key: string) => localStorage.getItem(key);

    static set = (key: string, value: string) => localStorage.setItem(key, value);

    static delete = (key: string) => localStorage.removeItem(key);

    static exists = (key: string): boolean => Settings.get(key) !== null;

    static clear = () => localStorage.clear();
}