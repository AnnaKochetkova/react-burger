import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

interface IIngredientProps {
    image: string;
    name: string;
    price: number;
    onClick: ()=>void;
}
const Ingredient = (props: IIngredientProps) => {
    return (
        <div className={styles.ingredient} onClick={props.onClick}>
            <Counter count={1} size="default" >1</Counter>
            <img src={props.image} alt={props.name} />
            <div className={styles.wrapperPrice}>
                <p className={`text text_type_digits-default mt-1 mb-1 pr-2 ${styles.price}`}>
                    {props.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            
            <p className={`text text_type_main-default ${styles.name}`}>{props.name}</p>
        </div>
    )
}

export default Ingredient;