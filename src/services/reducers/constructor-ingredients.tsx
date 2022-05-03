import { UPDATE_CONSTRUCTOR_INGREDIENTS, UPDATE_BUNS, SET_CONSTRUCTOR_INGREDIENT, UPDATE_CONSTRUCTOR, CLEAR_CONSTRUCTOR } from "../actions/constructor-ingredients";
import { ETypeActions } from "../actions/ingredients";
import { IConstructorIngredientsDND } from "../actions/constructor-ingredients";

export interface IAction {
    type: ETypeActions,
    payload: IConstructorIngredientsDND[] | IConstructorIngredientsDND | undefined,
}

interface IInitialState {
    ingredientsConstructor: IConstructorIngredientsDND[],
    buns: IConstructorIngredientsDND | undefined,
    amount: number,
}

const initialState: IInitialState = {
    ingredientsConstructor: [],
    buns: undefined,
    amount: 0,
}

function calcAmountCart(ingredients: IConstructorIngredientsDND[], bun: IConstructorIngredientsDND | undefined): number {
    const amountIngredients = ingredients.reduce((prev, curr) => prev + curr.price, 0);
    if (bun !== undefined) {
        return amountIngredients + (bun.price * 2);
    }
    return amountIngredients;
}

export const constructorIngredientsReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case UPDATE_CONSTRUCTOR_INGREDIENTS: {
            const ing = (state.ingredientsConstructor || []).concat(action.payload as IConstructorIngredientsDND[]);
            return {
                ...state,
                ingredientsConstructor: ing,
                amount: calcAmountCart(ing, state.buns as IConstructorIngredientsDND | undefined)
            }
        }
        case UPDATE_BUNS:{
            return {
                ...state,
                buns: action.payload as IConstructorIngredientsDND,
                amount: calcAmountCart((state.ingredientsConstructor || []), action.payload as IConstructorIngredientsDND | undefined)
            }
        }
        case SET_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                ingredientsConstructor: (action.payload || []) as IConstructorIngredientsDND[],
                amount: calcAmountCart((action.payload || []) as IConstructorIngredientsDND[], state.buns as IConstructorIngredientsDND | undefined)
            }
        }
        case UPDATE_CONSTRUCTOR: {
            return {
                ...state,
                ingredientsConstructor: (action.payload || []) as IConstructorIngredientsDND[],
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ingredientsConstructor: [],
                buns: undefined,
                amount: 0,
            }
        }
        default: {
            return state;
        }
    }
}