import { IAction } from "../reducers/order";
import { ETypeActions } from "./ingredients";

const url = 'https://norma.nomoreparties.space/api/';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

// type IDispatch =  (arg0: IAction) => IAction;

export const getOrderNumber = (idAllIngredients: string[]) => {
    return async function(dispatch: (arg0: { type: ETypeActions; order?: any; }) => void) {
        dispatch({
            type: ETypeActions.GET_ORDER_REQUEST,
        })
        const request = await fetch(`${url}orders`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "ingredients": idAllIngredients
            })
        })
        if (!request.ok) {
            dispatch({
                type: ETypeActions.GET_ORDER_ERROR
            })
            throw new Error('Ответ сети был не ok.');
        }
        const result = await request.json();
        dispatch({
            type: ETypeActions.GET_ORDER_SUCCESS,
            order: result.order.number,
        })
    }
}