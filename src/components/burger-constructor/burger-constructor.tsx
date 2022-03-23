import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';
import ConstructorIngredients from './constructor-ingredients';

const BurgerConstructor = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={`ml-8 ${styles.bun}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                    />
                </div>
                <div className={styles.ingredients}>
                    {
                        data.map(el => 
                        {
                            if(el.type !== "bun" && el.type !== "sauce"){
                                return <ConstructorIngredients name={el.name} image={el.image}/>
                            }
                            
                        })
                        
                    }
                </div>
                <div className={`ml-8 ${styles.bun}`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                    />
                </div>
            </div>
            <div className={`mt-10 ${styles.orderWrapper}`}>
                <span className={`text text_type_digits-medium mr-10 ${styles.span}`}>
                    610
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;