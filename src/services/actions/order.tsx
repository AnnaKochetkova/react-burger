import api from "../../utils/api";
import { ETypeActions } from "./ingredients";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const getOrderNumber = (idAllIngredients: string[]) => {
    return async function(dispatch: (arg0: { type: ETypeActions; order?: any; }) => void) {
        dispatch({
            type: ETypeActions.GET_ORDER_REQUEST,
        })
        try {
            const result = await api.getOrder(idAllIngredients);
            dispatch({
                type: ETypeActions.GET_ORDER_SUCCESS,
                order: result.order.number,
            })
        } catch (error) {
            dispatch({
                type: ETypeActions.GET_ORDER_ERROR
            })
        }
    }
}