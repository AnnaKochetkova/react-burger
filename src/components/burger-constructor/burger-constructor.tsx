import { useContext } from 'react';
import { ContextIngredients, IngredientsAPI } from '../app/contextIngredients';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorIngredients from './constructor-ingredients';
import { useState } from 'react';

interface IBurgerConstructorProps {
    onOpen: ()=>void;
}

const BurgerConstructor = (props: IBurgerConstructorProps) => {

    const {ingredientsConstructor, amount, bun} = useContext(ContextIngredients);
    const {createOrder} = useContext(IngredientsAPI);
    
    const {onOpen} = props;

    const handleCreateOrder = async() => {
        await createOrder();
        onOpen();
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>

                <div className={`ml-8 ${styles.bun}`}>
                    {
                        bun !== undefined && (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            /> 
                        )
                    }
                   
                </div>

                <div className={styles.ingredients}>
                {
                    ingredientsConstructor.map(el => {
                        return (
                            <ConstructorIngredients key={el._id} name={el.name} image={el.image} price={el.price}/>
                        )
                    })
                }
                </div>


                <div className={`ml-8 ${styles.bun}`}>
                    {
                        bun !== undefined && (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        )
                    }

                </div>
            </div>
            <div className={`mt-10 ${styles.orderWrapper}`}>
                <span className={`text text_type_digits-medium mr-10 ${styles.span}`}>
                    {amount}
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large" onClick={handleCreateOrder} >
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;