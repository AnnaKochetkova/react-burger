import { constructorIngredientsReducer } from "../reducers/constructor-ingredients";
import { ingredientsReducer } from "../reducers/ingredients";
import { orderNumberReducer } from "../reducers/order";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    constructor: constructorIngredientsReducer,
    ingredients: ingredientsReducer,
    order: orderNumberReducer,
})

export type RootState = ReturnType<typeof rootReducer>