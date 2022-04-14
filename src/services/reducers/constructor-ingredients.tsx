import { UPDATE_CONSTRUCTOR_INGREDIENTS, UPDATE_BUNS, SET_CONSTRUCTOR_INGREDIENT, UPDATE_CONSTRUCTOR } from "../actions/constructor-ingredients";
import { ETypeActions } from "../actions/ingredients";
import { IListItemIngredient } from "../../components/burger-ingredients/burger-ingredients";

export interface IAction {
    type: ETypeActions,
    payload: IListItemIngredient[] | IListItemIngredient | undefined,
}

interface IInitialState {
    ingredientsConstructor: IListItemIngredient[],
    buns: IListItemIngredient | undefined,
    amount: number,
}

const initialState: IInitialState = {
    ingredientsConstructor: [],
    buns: undefined,
    amount: 0,
}

function calcAmountCart(ingredients: IListItemIngredient[], bun: IListItemIngredient | undefined): number {
    const amountIngredients = ingredients.reduce((prev, curr) => prev + curr.price, 0);
    if (bun !== undefined) {
        return amountIngredients + (bun.price * 2);
    }
    return amountIngredients;
}

export const constructorIngredientsReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case UPDATE_CONSTRUCTOR_INGREDIENTS: {
            const ing = state.ingredientsConstructor.concat(action.payload as IListItemIngredient[]);
            return {
                ...state,
                ingredientsConstructor:ing,
                amount: calcAmountCart(ing, state.buns as IListItemIngredient | undefined)
            }
        }
        case UPDATE_BUNS:{
            return {
                ...state,
                buns: action.payload as IListItemIngredient,
                amount: calcAmountCart(state.ingredientsConstructor, action.payload as IListItemIngredient | undefined)
            }
        }
        case SET_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                ingredientsConstructor: action.payload as IListItemIngredient[],
                amount: calcAmountCart(action.payload as IListItemIngredient[], state.buns as IListItemIngredient | undefined)
            }
        }
        case UPDATE_CONSTRUCTOR: {
            return {
                ...state,
                ingredientsConstructor: action.payload as IListItemIngredient[],
            }
        }
        default: {
            return initialState;
        }
    }
}