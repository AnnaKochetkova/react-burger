import { useState, useEffect } from 'react';
import { IListItemIngredient } from '../components/burger-ingredients/burger-ingredients';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details-page.module.css';
import { useSelector } from '../services/logic/store';

interface PageParams {
    ingredientId: string;
}

const IngredientDetailsPage = () => {
    const [ing, setIng] = useState<IListItemIngredient | undefined>(undefined)
    let params = useParams<PageParams>();
    const ingredients = useSelector(store => store.ingredients.ingredients);
    useEffect(() => {
        if (params.ingredientId && ing?._id !== params.ingredientId) {
            let ingred = ingredients.find((el) => el._id === params.ingredientId)
            setIng(ingred);
        }
    }, [params, ingredients]);
    
    return (
        <div className={`${styles.wrapperIngredient} `}>
            <img className={styles.imageIngredient} src={ing?.image} alt="" />
            <p className='text text_type_main-medium mt-4 mb-8'>{ing?.name}</p>
            <div className={styles.containerValues}>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ing?.calories}</p>
                </div>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ing?.proteins}</p>
                </div>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ing?.fat}</p>
                </div>
                <div className={styles.values}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ing?.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetailsPage;