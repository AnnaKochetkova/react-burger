import { authorizationReducer } from './authorization';
import { AUTHORIZATION_ACCOUNT, AUTHORIZATION_ACCOUNT_ERROR, IS_READY } from '../actions/authorization';
import { IApiUser } from '../../utils/api';

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

describe('authorization reducer', () => {
    it('should return the initial state', () => {
        const action = {
            type: AUTHORIZATION_ACCOUNT,
            payload: undefined
        }
        expect(authorizationReducer(initialState, action)).toEqual(
            {
                user: undefined,
                accountError: false,
                isReady: false
            }
        )
    })

    it('should handle AUTHORIZATION_ACCOUNT', () => {
        const payload = { email: 'anyakochetkova99@mail.ru', name: 'Anna' };
        const action = {
            type: AUTHORIZATION_ACCOUNT,
            payload,
        }
        expect(
            authorizationReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                user: payload,
            }
        )

    })

    it('should handle AUTHORIZATION_ACCOUNT_ERROR', () => {
        const payload = { email: 'anyakochetkova99@mail.ru', name: 'Anna' };
        const action = {
            type: AUTHORIZATION_ACCOUNT_ERROR,
            payload,
        }
        expect(
            authorizationReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                accountError: true,
            }
        )

    })

    it('should handle IS_READY', () => {
        const payload = { email: 'anyakochetkova99@mail.ru', name: 'Anna' };
        const action = {
            type: IS_READY,
            payload,
        }
        expect(
            authorizationReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                isReady: true
            }
        )

    })
}) 