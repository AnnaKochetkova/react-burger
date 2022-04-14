import { GET_ALL_INGREDIENTS_SUCCESS, GET_ALL_INGREDIENTS_ERROR, GET_ALL_INGREDIENTS_REQUEST, ETypeActions } from "../actions/ingredients";

export interface IAction {
    type: ETypeActions,
    ingredients: [],
    ingredientsRequest: boolean,
    ingredientsError: boolean
}

const initialState = {
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
                ingredients: action.ingredients,
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
            console.log('default state ingredientsReducer', state, action);
            return state;
        }
    }
}