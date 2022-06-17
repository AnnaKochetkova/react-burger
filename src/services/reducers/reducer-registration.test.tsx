import { registrationReducer } from "./registration";
import { REGISTRATION_ACCOUNT, REGISTRATION_ACCOUNT_ERROR } from "../actions/registration";
import { IApiUser } from "../../utils/api";

interface IInitialState {
    user: IApiUser | undefined,
    accountError: boolean,
}

const initialState: IInitialState = {
    user: undefined,
    accountError: false,
}

const payload = { email: 'anyakochetkova99@mail.ru', name: 'Anna' };

describe('registration reducer', () => {
    it('should return the initial state', () => {
        const action = {
            type: REGISTRATION_ACCOUNT,
            payload: undefined,
        }
        expect(registrationReducer(initialState, action)).toEqual(
            {
                user: undefined,
                accountError: false,
            }
        )
    })

    it('should handle REGISTRATION_ACCOUNT', () => {
        const action = {
            type: REGISTRATION_ACCOUNT,
            payload,
        }
        expect(
            registrationReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                user: payload,
            }
        )

    })

    it('should handle REGISTRATION_ACCOUNT_ERROR', () => {
        const action = {
            type: REGISTRATION_ACCOUNT_ERROR,
            payload,
        }
        expect(
            registrationReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                accountError: true,
            }
        )

    })

}) 