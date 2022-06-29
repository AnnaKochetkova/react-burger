import { constructorIngredientsReducer } from "./constructor-ingredients";
import { IConstructorIngredientsDND } from "../actions/constructor-ingredients";
import { ETypeActions } from "../actions/ingredients";

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

const payloadIngredients = [
    {
       _id:"60666c42cc7b410027a1a9b5",
       name:"Говяжий метеорит (отбивная)",
       type: 'main',
       proteins:800,
       fat:800,
       carbohydrates:300,
       calories:2674,
       price:3000,
       image:"https://code.s3.yandex.net/react/code/meat-04.png",
       uuid: 'id',
    }];

const payloadBun = 
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
        uuid: 'id',
    };

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        const action = {
            type: ETypeActions.UPDATE_CONSTRUCTOR_INGREDIENTS,
            payload: [],
        }
        expect(constructorIngredientsReducer(initialState, action)).toEqual(
            {
                ingredientsConstructor: [],
                buns: undefined,
                amount: 0,
            }
        )
    })

    it('should handle UPDATE_CONSTRUCTOR_INGREDIENTS', () => {
        const action = {
            type: ETypeActions.UPDATE_CONSTRUCTOR_INGREDIENTS,
            payload: payloadIngredients,
        }
        
        expect(
            constructorIngredientsReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                ingredientsConstructor: payloadIngredients,
                amount: payloadIngredients.reduce((prev, curr) => prev + curr.price, 0)
            }
        )
    })

    it('should handle UPDATE_BUNS', () => {
        const action = {
            type: ETypeActions.UPDATE_BUNS,
            payload: payloadBun,
        }
        
        expect(
            constructorIngredientsReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                buns: payloadBun,
                amount: payloadBun.price * 2
            }
        )
    })

    it('should handle SET_CONSTRUCTOR_INGREDIENT', () => {
        const action = {
            type: ETypeActions.SET_CONSTRUCTOR_INGREDIENT,
            payload: payloadIngredients,
        }
        
        expect(
            constructorIngredientsReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                ingredientsConstructor: payloadIngredients,
                amount: payloadIngredients.reduce((prev, curr) => prev + curr.price, 0)
            }
        )
    })

    it('should handle UPDATE_CONSTRUCTOR', () => {
        const action = {
            type: ETypeActions.UPDATE_CONSTRUCTOR,
            payload: payloadIngredients,
        }
        
        expect(
            constructorIngredientsReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                ingredientsConstructor: payloadIngredients,
            }
        )
    })

    it('should handle CLEAR_CONSTRUCTOR', () => {
        const action = {
            type: ETypeActions.CLEAR_CONSTRUCTOR,
            payload: payloadIngredients,
        }
        
        expect(
            constructorIngredientsReducer(initialState, action),
        ).toEqual(
            {
                ...initialState,
                ingredientsConstructor: [],
                buns: undefined,
                amount: 0
            }
        )
    })
}) 