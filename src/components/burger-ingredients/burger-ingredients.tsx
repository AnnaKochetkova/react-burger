import { useState, useContext } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient';
import { groupBy } from '../../utils/group-by';
import { ContextIngredients, enumIngredientType } from '../app/contextIngredients';


export interface IListItemIngredient {
    type: enumIngredientType;
    _id: string;
    name: string;
    image: string;
    price: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
}

type TTransleteTitle = {
    [key: string]: string;
}

const transleteTitle:TTransleteTitle = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
}

export type TOnOpenBurgerIngredient = (item: IListItemIngredient) => void;

interface IBurgerIngredientsProps {
    onOpen: TOnOpenBurgerIngredient;
    
}

const BurgerIngredients = (props: IBurgerIngredientsProps) => {

    const {list} = useContext(ContextIngredients);

    const [current, setCurrent] = useState('one');

    const {onOpen} = props;
    const group = groupBy<IListItemIngredient>(list, (item) => item.type);
    

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

                {
                    Object.keys(group).map((key) => (
                        <div key={key}>
                            <p className={`text text_type_main-medium mt-10 mb-5 ${styles.headerText}`}>{transleteTitle[key]}</p>
                            <div className={styles.ingredientsCategory}>
                            {
                                group[key].map(el => {
                                    return (
                                        <Ingredient key={el._id} name={el.name} image={el.image} price={el.price} onClick={()=>onOpen(el)}/>
                                    )
                                })
                            }
                        </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BurgerIngredients;