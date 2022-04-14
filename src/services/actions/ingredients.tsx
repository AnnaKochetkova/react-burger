import {IAction} from '../reducers/ingredients';

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

// type IDispatch =  (arg0: IAction) => IAction;

const url = 'https://norma.nomoreparties.space/api/';

export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_ERROR = 'GET_ALL_INGREDIENTS_ERROR';

export const getIngredients = () => {
    return async function(dispatch: (arg0: { type: ETypeActions; ingredients?: any; }) => void) {
        dispatch({
            type: ETypeActions.GET_ALL_INGREDIENTS_REQUEST
        })
        let response = await fetch(`${url}ingredients`);
        if (!response.ok) {
            dispatch({
                type: ETypeActions.GET_ALL_INGREDIENTS_ERROR
            })
            throw new Error('Ответ сети был не ok.');
        }
        const result =  await response.json();
        dispatch({
            type: ETypeActions.GET_ALL_INGREDIENTS_SUCCESS,
            ingredients: result.data,
        })
    }
}

