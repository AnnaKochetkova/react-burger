import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';
import Ingredient from './ingredient';

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')

    return (
        <div className={styles.container}>
            <p className= {`text text_type_main-large ${styles.text}`}>
                Соберите бургер
            </p>
            <div className={styles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.allIngredients}>
                <p className={`text text_type_main-medium mt-10 mb-5 ${styles.headerText}`}>Булки</p>
                <div className={styles.ingredientsCategory}>
                    {
                        data.map(el => {
                            if (el.type === "bun") {
                                return (
                                    <Ingredient key={el._id} name={el.name} image={el.image} />
                                )
                            }
                        })
                    }
                </div>
                <p  className={`text text_type_main-medium mt-10 mb-5 ${styles.headerText}`}>Соусы</p>
                <div className={styles.ingredientsCategory}>
                    {
                        data.map(el => {
                            if (el.type === "sauce") {
                                return (
                                    <Ingredient key={el._id} name={el.name} image={el.image} />
                                )
                            }
                        })
                    }
                </div>
                <p className={`text text_type_main-medium mt-10 mb-5 ${styles.headerText}`}>Начинки</p>
                <div className={styles.ingredientsCategory}>
                    {
                        data.map(el => {
                            if (el.type === "main") {
                                return (
                                    <Ingredient key={el._id} name={el.name} image={el.image} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients;