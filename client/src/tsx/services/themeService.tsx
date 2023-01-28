const setTheme = (theme: number) => {
    localStorage.setItem("theme", String(theme))
}
const getTheme = (): string | null => {
    return localStorage.getItem("theme")
}
export {setTheme, getTheme}