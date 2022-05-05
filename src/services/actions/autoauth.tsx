import { getToken } from "../../utils/utils";
import api, { IApiUser } from "../../utils/api";
import { AUTHORIZATION_ACCOUNT, IS_READY } from "./authorization";

export const AUTO_AUTHORIZATION_ACCOUNT = 'AUTO_AUTHORIZATION_ACCOUNT';

export const autoauth = () => {
    return async function (dispatch: (arg0: { type: string, payload: IApiUser | undefined }) => void) {
        try {
            const token = getToken();
            if(token){
                const result = await api.me();
                console.log(result.user)
                dispatch({
                    type: AUTHORIZATION_ACCOUNT,
                    payload: result.user,
                });
                dispatch({
                    type: IS_READY,
                    payload: undefined
                });
            }
            dispatch({
                type: IS_READY,
                payload: undefined
            });
        } catch (error) {
            console.log('Error');
        }
        
    }
}