export type AppState = {
    user: User
    version: string,
}

export type User = {
    id: string,
    surname: string,
    firstname: string,
    password?: string,
    apiToken?: string,
}