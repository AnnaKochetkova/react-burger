import { wsFeedReducer } from "./ws-feed";
import { WS_GET_ORDERS, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, DataMessage } from "../actions/ws-feed";

interface IInitialState {
    wsConnected: boolean,
    orders: DataMessage | undefined,
}

const initialState: IInitialState = {
    wsConnected: false,
    orders: undefined,
}

const payload = {
    success: true,
    orders: [
      {
        ingredients: [
          "60d3463f7034a000269f45e7",
          "60d3463f7034a000269f45e9",
          "60d3463f7034a000269f45e8",
          "60d3463f7034a000269f45ea"
        ],
        _id: "",
        status: "done",
        name: 'Burger',
        number: 0,
        createdAt: "2021-06-23T14:43:22.587Z",
        updatedAt: "2021-06-23T14:43:22.603Z"
      }
    ],
    total: 1,
    totalToday: 1
} ;

describe('wsFeed reducer', () => {
    it('should return the initial state', () => {
        const action = {
            type: WS_GET_ORDERS,
            payload: undefined,
        }
        expect(wsFeedReducer(initialState, action)).toEqual(
            {
                wsConnected: false,
                orders: undefined,
            }
        )
    })

    it('should handle WS_GET_ORDERS', () => {
        const action = {
            type: WS_GET_ORDERS,
            payload,
        }
        expect(
            wsFeedReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                orders: payload,
            }
        )

    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS,
            payload,
        }
        expect(
            wsFeedReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                wsConnected: true,
            }
        )

    })

    it('should handle WS_CONNECTION_ERROR', () => {
        const action = {
            type: WS_CONNECTION_ERROR,
            payload,
        }
        expect(
            wsFeedReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                wsConnected: false,
            }
        )

    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        const action = {
            type: WS_CONNECTION_CLOSED,
            payload,
        }
        expect(
            wsFeedReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                wsConnected: false,
            }
        )
    })

}) 