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

const checkResponse = (res: Response) => {
    if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
    }
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
        checkResponse(request)
    return await request.json();
}

const getAllIngredients = async function() {
    let response = await makeRequest(`${baseUrl}ingredients`,{
        method: 'get'
    });
    checkResponse(response);
    return await response.json();
}

const getByIdIngredient = async function(id: string): Promise<IListItemIngredient> {
    let response = await makeRequest(`${baseUrl}ingredients`,{
        method: 'get'
    });
    checkResponse(response);
    const result = await response.json();
    return result.data.filter((el: IListItemIngredient) => el._id = id)[0];
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
    checkResponse(request);
    return await request.json();
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
    checkResponse(request);
    return await request.json();
}

const me = async function(): Promise<IApiRequestUser> {
    let response = await makeRequest(`${baseUrl}auth/user`,{
        method: 'get'
    });
    checkResponse(response);
    return await response.json();
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
    checkResponse(request);
    return await request.json();
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
    checkResponse(request);
    return await request.json();
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
    checkResponse(request);
    return await request.json();
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
    checkResponse(request);
    return await request.json();
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
    getByIdIngredient,
}
export default api;
