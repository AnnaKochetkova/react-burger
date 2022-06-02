import { GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_ERROR, GET_ALL_INGREDIENTS_REQUEST, ETypeActions } from "../actions/ingredients";
import { IListItemIngredient } from "../../components/burger-ingredients/burger-ingredients";

export interface IAction {
    type: ETypeActions,
    payload: IListItemIngredient[] | [],
}

interface IInitialState {
    ingredients: IListItemIngredient[] | [],
    ingredientsRequest: boolean,
    ingredientsError: boolean,
}

const initialState: IInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
}

export const ingredientsReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case GET_ALL_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            }
        }
        case GET_ALL_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload,
                ingredientsRequest: false,
                ingredientsError: false,
            }
        }
        case GET_ALL_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsError: true,
            }
        }
        default: {
            return state;
        }
    }
}