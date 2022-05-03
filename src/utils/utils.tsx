import { baseUrl } from "./api";

interface TokenApi {
    token: string;
    refreshToken: string;
    tokenLifetime: number;
    refreshTokenLifetime: number;
}

interface YandexToken {
    success: boolean;
    accessToken: string;
    refreshToken: string
}

export async function makeRequest(url: string, props: RequestInit ) {
    await checkToken();
    const tokenApi = getToken();
    const config: RequestInit = tokenApi ? {
        ...props,
        headers: {
            ...props.headers,
            authorization: tokenApi.token,
        }
    } : props;
    return await fetch(url , config)
}

export function convertYandexTokenToTokenApi(yandexToken: YandexToken): TokenApi {
    const tokenLifetime = addMinutes(new Date(), 20);
    const refreshTokenLifetime = addDays(new Date(), 20);
    return {
        token: yandexToken.accessToken,
        refreshToken: yandexToken.refreshToken,
        tokenLifetime: tokenLifetime.getTime(),
        refreshTokenLifetime: refreshTokenLifetime.getTime(),
    }
}

async function requestRefreshToken(tokenApi: TokenApi): Promise<TokenApi> {
    const request = await fetch(`${baseUrl}auth/token`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: tokenApi.refreshToken,
        })
    })
    const result = await request.json() as YandexToken;
    return convertYandexTokenToTokenApi(result)
}

async function checkToken() {
    const nowDate = new Date().getTime();
    const tokenApi = getToken();
    if(tokenApi) {
        if(tokenApi.tokenLifetime < nowDate){
            if(tokenApi.refreshTokenLifetime < nowDate){
                setToken(undefined)
            }
            else {
                const token = await requestRefreshToken(tokenApi)
                setToken(token);
            }
        }
    }
}

export function setToken (tokenApi: TokenApi | undefined) {
    if(tokenApi) {
        const str = JSON.stringify(tokenApi);
        setCookie('token', str, 20)
    } else {
        removeCookie('token')
    }
}

export function getToken(): TokenApi | undefined {
    const strToken = getCookie('token');
    if(strToken) {
        return JSON.parse(strToken);
    }
    return undefined;
}

function setCookie(name: string,value: string,minutes: number) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie (name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return undefined;
}

function removeCookie(name: string) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function addMinutes(dt: Date, minutes: number) {
    return new Date(dt.getTime() + minutes*60000);
}

function addDays(dt: Date, days: number) {
    return new Date(dt.getTime() + (days*1000*60*60*24));
}