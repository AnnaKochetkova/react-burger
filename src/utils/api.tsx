import { getToken, makeRequest } from "./utils";

export interface IApiUser {
    email: string,
    name: string,
}

interface IApiRequestUserActions {
    success: boolean,
    message: string
}

interface IApiRequestUser {
    success: boolean,
    user: IApiUser,
}

interface IApiRequest extends IApiRequestUser{
    accessToken: string,
    refreshToken: string,
}

export interface IApiOrder {
    number: number,
}

interface IApiRequestOrder {
    name: string,
    order: IApiOrder,
    success: boolean,
}

export const baseUrl = 'https://norma.nomoreparties.space/api/';

const checkResponse = async(res: Response) => {
    if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
    }
    return await res.json();
}

const getOrder = async function(idAllIngredients: string[]): Promise<IApiRequestOrder> {
    const request = await makeRequest(`${baseUrl}orders`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "ingredients": idAllIngredients
            })
        })
        return checkResponse(request)
}

const getAllIngredients = async function() {
    const response = await makeRequest(`${baseUrl}ingredients`,{
        method: 'get'
    });
    return checkResponse(response);
}

const authorizationAccount = async function(email: string, password: string | number): Promise<IApiRequest> {
    const request = await makeRequest(`${baseUrl}auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })
    return checkResponse(request);
}

const registrationAccount = async function(email: string, password: string, name: string): Promise<IApiRequest> {
    const request = await makeRequest(`${baseUrl}auth/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
            "name": name,
        })
    })
    return checkResponse(request);
}

const me = async function(): Promise<IApiRequestUser> {
    let response = await makeRequest(`${baseUrl}auth/user`,{
        method: 'get'
    });
    return checkResponse(response);
}

const logout = async function(): Promise<IApiRequestUserActions> {
    const tokenApi = getToken();
    let request = await makeRequest(`${baseUrl}auth/logout`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "token": tokenApi?.refreshToken,
        })
    })
    return checkResponse(request);
}

const forgotPassword = async function(email: string): Promise<IApiRequestUserActions>{
    const request = await makeRequest(`${baseUrl}password-reset`,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "email": email,
        })
    })
    return checkResponse(request);
}

const resetPassword = async function(password: string, token: string): Promise<IApiRequestUserActions> {
    const request = await makeRequest(`${baseUrl}password-reset/reset`,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "password": password,
            "token": token,
        })
    })
    return checkResponse(request);
}

const updateUser = async function (email: string, name: string): Promise<IApiRequestUser> {
    const request = await makeRequest(`${baseUrl}auth/user`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "email": email,
            "name": name,
        })
    })
    return checkResponse(request);
}

const api = {
    getOrder,
    getAllIngredients,
    authorizationAccount,
    registrationAccount,
    me,
    forgotPassword,
    logout,
    resetPassword,
    updateUser,
}
export default api;
