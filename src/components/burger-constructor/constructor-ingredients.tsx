import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

interface IIngredientProps {
    image: string;
    name: string;
}
const ConstructorIngredients = (props: IIngredientProps) => {
    return (
        <div className={styles.dopIngr}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={props.name}
                price={50}
                thumbnail={props.image}
            />
        </div>
    )
}

export default ConstructorIngredients;