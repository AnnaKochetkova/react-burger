import { ingredientsReducer } from "./ingredients";
import { ETypeActions } from "../actions/ingredients";
import { IListItemIngredient } from "../../components/burger-ingredients/burger-ingredients";

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

const payload = [
    {
       _id:"60666c42cc7b410027a1a9b1",
       name:"Краторная булка N-200i",
       type: 'bun',
       proteins:80,
       fat:24,
       carbohydrates:53,
       calories:420,
       price:1255,
       image:"https://code.s3.yandex.net/react/code/bun-02.png",
    }];

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        const action = {
            type: ETypeActions.GET_ALL_INGREDIENTS_SUCCESS,
            payload: [],
        }
        expect(ingredientsReducer(initialState, action)).toEqual(
            {
                ingredients: [],
                ingredientsRequest: false,
                ingredientsError: false,
            }
        )
    })

    it('should handle GET_ALL_INGREDIENTS_SUCCESS', () => {
        const action = {
            type: ETypeActions.GET_ALL_INGREDIENTS_SUCCESS,
            payload,
        }
        expect(
            ingredientsReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                ingredients: payload,
            }
        )

    })

    it('should handle GET_ALL_INGREDIENTS_REQUEST', () => {
        const action = {
            type: ETypeActions.GET_ALL_INGREDIENTS_REQUEST,
            payload,
        }
        expect(
            ingredientsReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                ingredientsRequest: true,
            }
        )

    })

    it('should handle GET_ALL_INGREDIENTS_ERROR', () => {
        const action = {
            type: ETypeActions.GET_ALL_INGREDIENTS_ERROR,
            payload,
        }
        expect(
            ingredientsReducer(initialState, action)
        ).toEqual(
            {
                ...initialState,
                ingredientsError: true,
            }
        )

    })

}) 