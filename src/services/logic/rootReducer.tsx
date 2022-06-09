import { constructorIngredientsReducer } from "../reducers/constructor-ingredients";
import { ingredientsReducer } from "../reducers/ingredients";
import { orderNumberReducer } from "../reducers/order";
import { registrationReducer } from "../reducers/registration";
import { authorizationReducer } from "../reducers/authorization";
import { wsFeedReducer } from "../reducers/ws-feed";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderNumberReducer,
    registration: registrationReducer,
    constructor: constructorIngredientsReducer,
    authorization: authorizationReducer,
    feed: wsFeedReducer,
})

export type RootState = ReturnType<typeof rootReducer>