import axios from 'axios';
import { User } from '../../../types/AppState.js';
import url from '../../../url.js';

export const login = async(id: string, password: string) => {
    return axios.post<Pick<User, "id" | "surname" | "firstname" | "apiToken">>(url + '/api/login', { id: id, password: password });
}

export const logout = async(id: string) => {
    return axios.post(url + '/api/logout', { id: id });
}

export const getVersion = async() => {
    return axios.get<string>(url + '/api/version');
}

export const verify = async(authToken: string) => {
    return axios.post<string>(url + '/verify', { authToken: authToken });
}