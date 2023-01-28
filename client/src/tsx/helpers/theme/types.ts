export interface ITheme {
    userId: number,
    id: number,
    bgColor: string,
    textColor: string,
    bgLight: string,
    textLight: string,
    borderColor: string,
    isDefaultTheme: string,
    active: boolean,
}
export interface IThemeStore{
    [index: number]: ITheme
}