import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, IS_CREATED } from "../actions/order";
import { IApiOrder } from "../../utils/api";
import { ETypeActions } from "../actions/ingredients";

type IActionPayloadNumber = number;

export interface IAction {
    type: ETypeActions,
    payload: IApiOrder | undefined | IActionPayloadNumber,
}

interface IInitialState {
    order: IActionPayloadNumber | undefined,
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

export const orderNumberReducer = (state = initialState, action: IAction): IInitialState => {
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
                order: action.payload as number,
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
        case IS_CREATED: {
            return {
                ...state,
                isCreated: true,
            }
        }
        default: {
            return state;
        }
    }
}