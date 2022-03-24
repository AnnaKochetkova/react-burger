import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

interface IIngredientProps {
    image: string;
    name: string;
}
const Ingredient = (props: IIngredientProps) => {
    return (
        <div className={styles.ingredient}>
            <Counter count={1} size="default" >1</Counter>
            <img src={props.image} alt={props.name} />
            <p className={`text text_type_digits-default mt-1 mb-1 ${styles.price}`}>
                20
                <CurrencyIcon type="primary" />
            </p>
            <p className={`text text_type_main-default ${styles.name}`}>{props.name}</p>
        </div>
    )
}

export default Ingredient;