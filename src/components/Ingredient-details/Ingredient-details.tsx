import { IListItemIngredient } from '../burger-ingredients/burger-ingredients';
import styles from './Ingredient-details.module.css';

interface IIngredientDetails {
    ingredientDetails: IListItemIngredient | undefined;
}

const IngredientDetails = ({ingredientDetails}: IIngredientDetails) => {
    return (
        <div className={`${styles.wrapperIngredient} `}>
            <img className={styles.imageIngredient} src={ingredientDetails?.image} alt="" />
            <p className='text text_type_main-medium mt-4 mb-8'>{ingredientDetails?.name}</p>
            <div className={styles.containerValues}>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredientDetails?.calories}</p>
                </div>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredientDetails?.proteins}</p>
                </div>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredientDetails?.fat}</p>
                </div>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredientDetails?.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails;