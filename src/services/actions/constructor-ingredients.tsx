import { IAction } from "../reducers/constructor-ingredients";
import { ETypeActions } from "./ingredients";
import { IListItemIngredient } from "../../components/burger-ingredients/burger-ingredients";

export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const UPDATE_BUNS = 'GET_BUNS';
export const SET_CONSTRUCTOR_INGREDIENT = 'SET_CONSTRUCTOR_INGREDIENT';
export const UPDATE_CONSTRUCTOR = 'UPDATE_CONSTRUCTOR';

type IDispatch =  (arg0: IAction) => IAction;

export const setConstructorIngredients = (constructorIngredients: IListItemIngredient) => {
    return function(dispatch: IDispatch) {
        dispatch({
            type: ETypeActions.UPDATE_CONSTRUCTOR_INGREDIENTS,
            payload: constructorIngredients,
        });
    }
}

export const setConstructorBuns = (buns: IListItemIngredient) => {
    return function(dispatch: IDispatch) {
        dispatch({
            type: ETypeActions.UPDATE_BUNS,
            payload: buns,
        })
    }
}

export const deleteConstructorIngredient = (index: number) => {
    return function(dispatch: IDispatch, getState: () => any) {
        const store = getState();
        const newIngredients = [...store.constructor.ingredientsConstructor];
        if (index !== -1) {
            newIngredients.splice(index, 1);
        }
        dispatch({
            type: ETypeActions.SET_CONSTRUCTOR_INGREDIENT,
            payload: newIngredients
        })
    }
}