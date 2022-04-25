import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR } from "../actions/order";
import { ETypeActions } from "../actions/ingredients";

export interface IAction {
    type: ETypeActions,
    order: number,
    orderRequest: boolean,
    orderError: boolean
}

const initialState = {
    order: 0,
    orderRequest: false,
    orderError: false,
}

export const orderNumberReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderRequest: false,
                orderError: false,
            }
        }
        case GET_ORDER_ERROR: {
            return {
                ...state,
                orderRequest: false,
                orderError: true,
            }
        }
        default: {
            return state;
        }
    }
}