import { REGISTRATION_ACCOUNT, REGISTRATION_ACCOUNT_ERROR } from "../actions/registration";
import { IApiUser } from "../../utils/api";

interface IAction {
    type: string,
    payload: IApiUser | undefined,
}

interface IInitialState {
    user: IApiUser | undefined,
    accountError: boolean,
}

const initialState: IInitialState = {
    user: undefined,
    accountError: false
}

export const registrationReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case REGISTRATION_ACCOUNT: {
            return {
                ...state,
                user: action.payload,
            }
        }
        case REGISTRATION_ACCOUNT_ERROR: {
            return {
                ...state,
                accountError: true
            }
        }
        default:
            return state;
    }
}