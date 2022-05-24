import api from "../../utils/api";

export const REGISTRATION_ACCOUNT = "REGISTRATION_ACCOUNT";
export const REGISTRATION_ACCOUNT_ERROR = "REGISTRATION_ACCOUNT_ERROR";

export const registrationAccount = (email: string, password: string, name: string) => {
    return async function(dispatch: (arg0: { type: string; payload?: any; }) => void) {
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
                })
            }

        } catch (error) {
            dispatch({
                type: REGISTRATION_ACCOUNT_ERROR,
            })
        }
    }
}