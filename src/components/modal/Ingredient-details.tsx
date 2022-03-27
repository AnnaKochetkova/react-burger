import { IListItemIngredient } from '../burger-ingredients/burger-ingredients';
import styles from './modal.module.css';

interface IIngredientDetails {
    ingredients: IListItemIngredient | undefined;
}

const IngredientDetails = ({ingredients}: IIngredientDetails) => {
    return (
        <div className={`${styles.wrapperIngredient} `}>
            <img className={styles.imageIngredient} src={ingredients?.image} alt="" />
            <p className='text text_type_main-medium mt-4 mb-8'>{ingredients?.name}</p>
            <div className={styles.containerValues}>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredients?.calories}</p>
                </div>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredients?.proteins}</p>
                </div>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredients?.fat}</p>
                </div>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredients?.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails;