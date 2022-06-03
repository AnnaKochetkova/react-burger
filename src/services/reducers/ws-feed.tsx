import { WS_GET_ORDERS, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, DataMessage } from "../actions/ws-feed";

interface IAction {
    type: string;
    payload: DataMessage | undefined  ;
}

interface IInitialState {
    wsConnected: boolean,
    orders: DataMessage | undefined,
    // url: string | undefined
}

const initialState: IInitialState = {
    wsConnected: false,
    orders: undefined,
    // url: undefined
}

export const wsFeedReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                // url: action.payload
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };
            
        case WS_GET_ORDERS: {
            return {
                ...state,
                orders: action.payload
            }
        }

        default:
            return state;
    }
}