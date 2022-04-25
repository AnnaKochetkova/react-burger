import {IAction} from '../reducers/ingredients';
import api from '../../utils/api';

export enum ETypeActions {
    GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST',
    GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS',
    GET_ALL_INGREDIENTS_ERROR = 'GET_ALL_INGREDIENTS_ERROR',

    UPDATE_BUNS = 'GET_BUNS',
    UPDATE_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS',
    SET_CONSTRUCTOR_INGREDIENT = 'SET_CONSTRUCTOR_INGREDIENT',
    UPDATE_CONSTRUCTOR = 'UPDATE_CONSTRUCTOR',

    GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS',
    GET_ORDER_REQUEST = 'GET_ORDER_REQUEST',
    GET_ORDER_ERROR = 'GET_ORDER_ERROR',
}

export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_ERROR = 'GET_ALL_INGREDIENTS_ERROR';

export const getIngredients = () => {
    return async function(dispatch: (arg0: { type: ETypeActions; ingredients?: any; }) => void) {
        dispatch({
            type: ETypeActions.GET_ALL_INGREDIENTS_REQUEST
        })
        try {
            const result = await api.getAllIngredients()
            dispatch({
                type: ETypeActions.GET_ALL_INGREDIENTS_SUCCESS,
                ingredients: result.data,
            })
        } catch (error) {
            dispatch({
                type: ETypeActions.GET_ALL_INGREDIENTS_ERROR,
            })
        }


    }
}

