import api from '../../utils/api';
import { AppDispatch, AppThunk } from '../logic/store';

export enum ETypeActions {
    GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST',
    GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS',
    GET_ALL_INGREDIENTS_ERROR = 'GET_ALL_INGREDIENTS_ERROR',

    UPDATE_BUNS = 'GET_BUNS',
    UPDATE_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS',
    SET_CONSTRUCTOR_INGREDIENT = 'SET_CONSTRUCTOR_INGREDIENT',
    UPDATE_CONSTRUCTOR = 'UPDATE_CONSTRUCTOR',
    CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR',

    GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
    GET_ORDER_REQUEST = 'GET_ORDER_REQUEST',
    GET_ORDER_ERROR = 'GET_ORDER_ERROR',
    IS_CREATED = 'IS_CREATED'
}

export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_ERROR = 'GET_ALL_INGREDIENTS_ERROR';

export const getIngredients: AppThunk = () => {
    return async function(dispatch: AppDispatch) {
        dispatch({
            type: ETypeActions.GET_ALL_INGREDIENTS_REQUEST,
            payload: undefined
        })
        try {
            const result = await api.getAllIngredients()
            dispatch({
                type: ETypeActions.GET_ALL_INGREDIENTS_SUCCESS,
                payload: result.data
            })
        } catch (error) {
            dispatch({
                type: ETypeActions.GET_ALL_INGREDIENTS_ERROR,
                payload: undefined
            })
        }


    }
}

