import { IListItemIngredient } from "../components/burger-ingredients/burger-ingredients";
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

export const baseUrl = 'https://norma.nomoreparties.space/api/';

const checkResponse = async(res: Response) => {
    if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
    }
    return await res.json();
}

const getOrder = async function(idAllIngredients: string[]) {
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
    // return await request.json();
}

const getAllIngredients = async function() {
    const response = await makeRequest(`${baseUrl}ingredients`,{
        method: 'get'
    });
    return checkResponse(response);
    // return await response.json();
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
    // return await request.json();
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
    // return await request.json();
}

const me = async function(): Promise<IApiRequestUser> {
    let response = await makeRequest(`${baseUrl}auth/user`,{
        method: 'get'
    });
    return checkResponse(response);
    // return await response.json();
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
    // return await request.json();
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
    // return await request.json();
}

const resetPassword = async function(password: string, token: string) {
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
    // return await request.json();
}

const updateUser = async function (email: string, name: string) {
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
    // return await request.json();
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
