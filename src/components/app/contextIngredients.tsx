import { createContext, useEffect, useReducer, useCallback } from "react";
import api from "../../utils/api";
import { IListItemIngredient } from '../burger-ingredients/burger-ingredients';

export enum EIngredientType {
    bun = "bun",
    sauce = "sauce",
    main = "main",
}

interface IProviderIngredientsProps {
    children: JSX.Element;
}

interface IStore {
    list: IListItemIngredient[];
    ingredientsConstructor: IListItemIngredient[];
    bun: IListItemIngredient | undefined;
    amount: number;
    order: number | undefined;
}

interface IAction {
    type: 'init' | 'setBun' | 'setIngredientsConstructor' | 'setOrderNumber';
    payload?: IListItemIngredient[] | IListItemIngredient | number;
}

const initialStore: IStore = {
    list: [],
    amount: 0,
    bun: undefined,
    ingredientsConstructor: [],
    order: 0,
};


interface IIngredientsApi {
    createOrder: () => Promise<void>;
}

const initApi: IIngredientsApi = {
    createOrder: async () => { },
}

export const ContextIngredients = createContext<IStore>(initialStore);
export const IngredientsAPI = createContext<IIngredientsApi>(initApi);

function calcAmountCart(ingredients: IListItemIngredient[], bun: IListItemIngredient | undefined): number {
    const amountIngredients = ingredients.reduce((prev, curr) => prev + curr.price, 0);
    if (bun !== undefined) {
        return amountIngredients + (bun.price * 2);
    }
    return amountIngredients;
}

function reducer(state: IStore, action: IAction): IStore {
    switch (action.type) {
        case 'init':
            return {
                ...state,
                list: action?.payload as IListItemIngredient[],
            }
        case 'setBun': {
            const currBun = action.payload as IListItemIngredient;
            return {
                ...state,
                bun: currBun,
                amount: calcAmountCart(state.ingredientsConstructor, currBun),
            }
        }
        case 'setIngredientsConstructor': {
            const currIngr = action.payload as IListItemIngredient[];
            return {
                ...state,
                ingredientsConstructor: currIngr,
                amount: calcAmountCart(currIngr, state.bun),
            }
        }
        case 'setOrderNumber': {
            return {
                ...state,
                order: action.payload as number,
            }
        }
        default:
            return state
    }
}

export function ProviderIngredients({ children }: IProviderIngredientsProps) {
    const [storeIngredients, ingredientsDispatcher] = useReducer(reducer, initialStore);

    const createOrder = useCallback(async () => {

        const idIngredients = storeIngredients.ingredientsConstructor.map(el => el._id);
        const idBuns = storeIngredients.bun !== undefined ? [storeIngredients.bun._id, storeIngredients.bun._id] : [];
        const idAllIngredients = idIngredients.concat(idBuns);

        
        let result = await api.getOrder(idAllIngredients);
        ingredientsDispatcher({type: 'setOrderNumber', payload: result.order.number})

    }, [storeIngredients])

    useEffect(() => {
        (async function () {
            try {
                
                let result = await api.getAllIngredients();
                ingredientsDispatcher({ type: 'init', payload: result.data });
                ingredientsDispatcher({ type: 'setIngredientsConstructor', payload: result.data.filter((el: IListItemIngredient) => el.type !== 'bun') });
                const bunConstructor = result.data.find((el: IListItemIngredient) => el.type === 'bun')
                ingredientsDispatcher({ type: 'setBun', payload: bunConstructor });
            } catch (error) {
                console.log(error);
            }

        }())
    }, [])
    return  <ContextIngredients.Provider value={storeIngredients}>
                <IngredientsAPI.Provider value={{ createOrder }}>
                    {children}
                </IngredientsAPI.Provider>
            </ContextIngredients.Provider>
}