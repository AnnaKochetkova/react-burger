import api from "../../utils/api";
import { convertYandexTokenToTokenApi, setToken } from "../../utils/utils";

export const AUTHORIZATION_ACCOUNT = 'AUTHORIZATION_ACCOUNT';
export const AUTHORIZATION_ACCOUNT_ERROR = 'AUTHORIZATION_ACCOUNT_ERROR';
export const IS_READY = 'IS_READY'; 


export const authorization = (email: string, password: string) => {
    return async function(dispatch: (arg0: { type: string; payload?: any; }) => void) {
        try {
            const result = await api.authorizationAccount(email, password);
            console.log(result, 'result');
            const tokenApi = convertYandexTokenToTokenApi({success: result.success, accessToken: result.accessToken, refreshToken: result.refreshToken});
            setToken(tokenApi);
            if(result.success) {
                dispatch({
                    type: AUTHORIZATION_ACCOUNT,
                    payload: result.user,
                })
            } else{
                dispatch({
                    type: AUTHORIZATION_ACCOUNT_ERROR,
                })
            }
        } catch (error) {
            dispatch({
                type: AUTHORIZATION_ACCOUNT_ERROR,
            })
        }

    }
}