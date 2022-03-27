import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
// import data from '../../utils/data';
import Ingredient from './ingredient';

export interface IListItemIngredient {
    type: "bun" |"sauce" | "main";
    _id: string;
    name: string;
    image: string;
    price: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
}

export type TOnOpenBurgerIngredient = (item: IListItemIngredient) => void;

interface IBurgerIngredientsProps {
    onOpen: TOnOpenBurgerIngredient;
}

const BurgerIngredients = (props: IBurgerIngredientsProps) => {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    const [current, setCurrent] = useState('one');
    const [list, setList] = useState<IListItemIngredient[]>([]);

    const {onOpen} = props;

    const request = useCallback(async () => {
        try {
            let response = await fetch(url);
            let result = await response.json();
            setList(result.data); 
        } catch (error) {
            console.log(error);
        }
   
    }, []);
    useEffect(() => {
        request()
    }, [request])

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
                        list.map(el => {
                            if (el.type === "bun") {
                                return (
                                    <Ingredient key={el._id} name={el.name} image={el.image} price={el.price} onClick={()=>onOpen(el)}/>
                                )
                            }
                        })
                    }
                </div>
                <p  className={`text text_type_main-medium mt-10 mb-5 ${styles.headerText}`}>Соусы</p>
                <div className={styles.ingredientsCategory}>
                    {
                        list.map(el => {
                            if (el.type === "sauce") {
                                return (
                                    <Ingredient key={el._id} name={el.name} image={el.image} price={el.price} onClick={()=>onOpen(el)}/>
                                )
                            }
                        })
                    }
                </div>
                <p className={`text text_type_main-medium mt-10 mb-5 ${styles.headerText}`}>Начинки</p>
                <div className={styles.ingredientsCategory}>
                    {
                        list.map(el => {
                            if (el.type === "main") {
                                return (
                                    <Ingredient key={el._id} name={el.name} image={el.image} price={el.price} onClick={()=>onOpen(el)}/>
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