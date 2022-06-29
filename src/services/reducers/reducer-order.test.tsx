import { orderNumberReducer } from "./order";
import { ETypeActions } from "../actions/ingredients";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, IS_CREATED } from "../actions/order";

interface IInitialState {
    order: number | undefined,
    orderRequest: boolean,
    orderError: boolean,
    isCreated: boolean,
}

const initialState: IInitialState = {
    order: undefined,
    orderRequest: false,
    orderError: false,
    isCreated: false,
}

const payload = { number: 6257 };

describe('order reducer', () => {
    it('should return the initial state', () => {
        const action = {
            type: ETypeActions.GET_ORDER_SUCCESS,
            payload: undefined,
        }
        expect(orderNumberReducer(initialState, action)).toEqual(
            {
                order: undefined,
                orderRequest: false,
                orderError: false,
                isCreated: false,
            }
        )
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        const action = {
            type: ETypeActions.GET_ORDER_SUCCESS,
            payload,
        }
        expect(
            orderNumberReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                order: payload,
            }
        )

    })

    it('should handle GET_ORDER_REQUEST', () => {
        const action = {
            type: ETypeActions.GET_ORDER_REQUEST,
            payload,
        }
        expect(
            orderNumberReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                orderRequest: true,
            }
        )

    })

    it('should handle GET_ORDER_ERROR', () => {
        const action = {
            type: ETypeActions.GET_ORDER_ERROR,
            payload,
        }
        expect(
            orderNumberReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                orderError: true,
            }
        )

    })

    it('should handle IS_CREATED', () => {
        const action = {
            type: ETypeActions.IS_CREATED,
            payload,
        }
        expect(
            orderNumberReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                isCreated: true,
            }
        )

    })

}) 