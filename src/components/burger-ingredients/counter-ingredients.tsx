import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { RootState } from '../../services/logic/rootReducer';
import { useSelector } from '../../services/logic/store';

interface ICounterProps {
    id: string
}

export const CounterIngredients = ({id} : ICounterProps) => {
    const constructorIngredients = useSelector(store => store.constructor.ingredientsConstructor) || [] ;
    
    const count = constructorIngredients.filter(el => el._id === id).length;

    if(count === 0){
        return null;
    }
    return (
        <Counter count={count} size="default" >{count}</Counter>
    )
}

export const CounterBuns = ({id} : ICounterProps) => {
    const bun = useSelector((store: RootState) => store.constructor.buns);
    if(bun !== undefined && bun._id === id) {
        return (
            <Counter count={2} size="default" >{2}</Counter>
        )
    }
    return null;
}