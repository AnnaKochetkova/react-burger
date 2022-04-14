import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { IListItemIngredient } from './burger-ingredients';
import {CounterIngredients, CounterBuns} from './counter-ingredients';
import styles from './burger-ingredients.module.css';

interface IIngredientProps {
    el: IListItemIngredient;
    image: string;
    name: string;
    price: number;
    count: number;
    onClick: ()=>void;
}
const Ingredient = (props: IIngredientProps) => {

    const { _id, name, price, image, type } = props.el;

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...props.el },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
        <div ref={dragRef} className={styles.ingredient} onClick={props.onClick} style={{ opacity }} >
            {
                type === 'bun' ? <CounterBuns id={_id}/> : <CounterIngredients id={_id}/>
            }
            <img src={props.image} alt={props.name} />
            <div className={`${styles.wrapperPrice} mt-1 mb-1`}>
                <p className={`text text_type_digits-default  pr-2 ${styles.price}`}>
                    {props.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            
            <p className={`text text_type_main-default ${styles.name}`}>{props.name}</p>
        </div>
    )
}

export default Ingredient;