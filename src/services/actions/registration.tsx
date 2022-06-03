import api from "../../utils/api";
import { AppDispatch, AppThunk } from "../logic/store";

export const REGISTRATION_ACCOUNT = "REGISTRATION_ACCOUNT";
export const REGISTRATION_ACCOUNT_ERROR = "REGISTRATION_ACCOUNT_ERROR";

export const registrationAccount: AppThunk = (email: string, password: string, name: string) => {
    return async function(dispatch: AppDispatch) {
        try {
            const result = await api.registrationAccount(email, password, name);
            if(result.success) {
                dispatch({
                    type: REGISTRATION_ACCOUNT,
                    payload: result.user,
                })
            } else {
                dispatch({
                    type: REGISTRATION_ACCOUNT_ERROR,
                    payload: undefined
                })
            }

        } catch (error) {
            dispatch({
                type: REGISTRATION_ACCOUNT_ERROR,
                payload: undefined
            })
        }
    }
}