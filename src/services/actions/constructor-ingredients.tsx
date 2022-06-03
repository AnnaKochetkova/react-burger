import { IAction } from "../reducers/constructor-ingredients";
import { ETypeActions } from "./ingredients";
import { IListItemIngredient } from "../../components/burger-ingredients/burger-ingredients";
import { AppDispatch, AppThunk } from "../logic/store";

export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const UPDATE_BUNS = 'GET_BUNS';
export const SET_CONSTRUCTOR_INGREDIENT = 'SET_CONSTRUCTOR_INGREDIENT';
export const UPDATE_CONSTRUCTOR = 'UPDATE_CONSTRUCTOR';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

type IDispatch =  AppDispatch;

export interface IConstructorIngredientsDND extends IListItemIngredient {
    uuid: string,
}

export const setConstructorIngredients = (constructorIngredients: IConstructorIngredientsDND) => {
    return {
        type: ETypeActions.UPDATE_CONSTRUCTOR_INGREDIENTS,
        payload: constructorIngredients,
    }
}

export const setConstructorBuns = (buns: IConstructorIngredientsDND) => {
    return {
        type: ETypeActions.UPDATE_BUNS,
        payload: buns,
    }
}

export const deleteConstructorIngredient: AppThunk = (index: number) => {
    return function(dispatch: IDispatch, getState: () => any) {
        try {
            const store = getState();
            const newIngredients = [...store.constructor.ingredientsConstructor];
            if (index !== -1) {
                newIngredients.splice(index, 1);
            }
            dispatch({
                type: ETypeActions.SET_CONSTRUCTOR_INGREDIENT,
                payload: newIngredients,
            })
        } catch (error) {
            console.log('Error');
        }
        
    }
}