import api from "../../utils/api";
import { AppDispatch, AppThunk } from "../logic/store";
import { IAction } from "../reducers/order";
import { ETypeActions } from "./ingredients";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const IS_CREATED = 'IS_CREATED';

export const getOrderNumber: AppThunk = (idAllIngredients: string[]) => {
    return async function(dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
            payload: undefined
        })
        try {
            const result = await api.getOrder(idAllIngredients);
            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: result.order.number,
            } as IAction)
        } catch (error) {
            dispatch({
                type: GET_ORDER_ERROR,
                payload: undefined
            })
        }
    }
}