import { IApiUser } from "../../utils/api";
import { AUTHORIZATION_ACCOUNT, AUTHORIZATION_ACCOUNT_ERROR, IS_READY } from "../actions/authorization";

interface IAction {
    payload: IApiUser | undefined;
    type: string,
}

interface IInitialState {
    user: IApiUser | undefined,
    accountError: boolean,
    isReady: boolean
}

const initialState: IInitialState = {
    user: undefined,
    accountError: false,
    isReady: false,
}

export const authorizationReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case AUTHORIZATION_ACCOUNT: {
            return {
                ...state,
                user: action.payload,
            }
        }
        case AUTHORIZATION_ACCOUNT_ERROR: {
            return {
                ...state,
                accountError: true,
            }
        }
        case IS_READY: {
            return {
                ...state,
                isReady: true,
            }
        }
        default:
            return state;
    }
}