import { useCallback, useEffect } from 'react';
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderNumber } from '../../services/actions/order';
import { setConstructorIngredients, setConstructorBuns } from '../../services/actions/constructor-ingredients';
import ConstructorBuns from './constructor-buns';
import { useDrop } from 'react-dnd';
import { UPDATE_CONSTRUCTOR } from '../../services/actions/constructor-ingredients';
import { RootState } from '../../services/logic/rootReducer';
import ConstructorElementIngredient from './constructor-element-ingredient';
import { IConstructorIngredientsDND } from '../../services/actions/constructor-ingredients';
import { IS_CREATED } from '../../services/actions/order';
import { v4 as uuidv4 } from 'uuid';
import { SET_CONSTRUCTOR_INGREDIENT } from '../../services/actions/constructor-ingredients';
import { CLEAR_CONSTRUCTOR } from '../../services/actions/constructor-ingredients';
import { Redirect, useHistory } from 'react-router-dom';

interface IBurgerConstructorProps {
    onOpen: ()=>void;
}

const BurgerConstructor = (props: IBurgerConstructorProps) => {
    const dispatch = useDispatch();

    const history = useHistory();


    const user = useSelector((store: RootState) => store.authorization.user);

    const bun = useSelector((store: RootState) => store.constructor.buns);
    
    const amount = useSelector((store: RootState) => store.constructor.amount);

    const isCreated = useSelector((store: RootState) => store.order.isCreated);
    
    const {onOpen} = props;

    const constructorIngredients = useSelector((store: RootState) => store.constructor.ingredientsConstructor)

    const [{ isHover }, dropTargerRef] = useDrop({

        accept: 'ingredient',
        collect: monitor => ({
          isHover: monitor.isOver()
        }),
        drop(item) {
            const ing = item as IConstructorIngredientsDND;
            const uuid = uuidv4();
            if (ing.type !== 'bun'){
                dispatch(setConstructorIngredients({...ing, uuid}));
            }
        }
    });

    const [{ isOver }, dropTargerBunRef] = useDrop({

        accept: 'ingredient',
        collect: monitor => ({
          isOver: monitor.isOver()
        }),
        drop(item) {
            const bun = item as IConstructorIngredientsDND;
            if (bun.type === 'bun'){
                dispatch(setConstructorBuns(bun));

            }
        }
    });

    const handleCreateOrder = () => {
        if(user){
            if(bun && constructorIngredients){
                if(bun !== undefined){
                    const idIngredients = constructorIngredients.map(el => el._id);
                    const idBuns = bun !== null ? [bun._id, bun._id] : [];
                    const idAllIngredients = idIngredients.concat(idBuns);
                    dispatch(getOrderNumber(idAllIngredients));
                }
                onOpen();
                dispatch({type: CLEAR_CONSTRUCTOR});
            }
            history.push(`/order`)
        } else{
            dispatch({type: IS_CREATED, isCreated: true});
            window.localStorage.setItem('constructorIngredients', JSON.stringify(constructorIngredients));
            window.localStorage.setItem('bun', JSON.stringify(bun));
            history.push(`/login`);
        }
        
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = constructorIngredients[dragIndex];
        const newCards = [...constructorIngredients];
        newCards.splice(dragIndex, 1);
        newCards.splice(hoverIndex, 0, dragCard);
        dispatch({
            type: UPDATE_CONSTRUCTOR,
            payload: newCards,
        })
    }, [constructorIngredients, dispatch])

    useEffect(() => {
        if(isCreated && constructorIngredients === [] && bun === undefined) {            
            const ingredientsStr = window.localStorage.getItem("constructorIngredients");
            const bunStr = window.localStorage.getItem("bun");
            if (ingredientsStr !== null && bunStr !== null) {
                const ing = JSON.parse(ingredientsStr) as IConstructorIngredientsDND[];
                const b = JSON.parse(ingredientsStr) as IConstructorIngredientsDND;
                dispatch({
                    type: SET_CONSTRUCTOR_INGREDIENT,
                    ingredientsConstructor: ing,
                    buns: b
                });
            }
        }
    }, [isCreated, constructorIngredients, bun])

    return (
        <div className={styles.container}>
            <div className={styles.wrapper} >
                <div className={`ml-8 ${styles.bun} ${isOver ? styles.hoverBun : ''}`} ref={dropTargerBunRef}>
                    <ConstructorBuns typeBun="top" typeText='(верх)'/>
                </div>
                <div className={`${styles.ingredients} ${isHover ? styles.hover : ''}`} ref={dropTargerRef}>
                    {
                    constructorIngredients && 
                        constructorIngredients.map((el, index) => {
                            return (
                                <ConstructorElementIngredient key={el.uuid} index={index} el={el} moveCard={moveCard}/>
                            )
                        })
                    }
                </div>
                <div className={`ml-8 ${styles.bun}`}>
                    <ConstructorBuns typeBun="bottom" typeText='(низ)'/>
                </div>
            </div>

            <div className={`mt-10 ${styles.orderWrapper}`}>
                <span className={`text text_type_digits-medium mr-10 ${styles.span}`}>
                    {
                        amount ? <>{amount}</> : '0'
                    }
                    <CurrencyIcon type="primary" />
                </span>
                {/* <Link to={`/order/${order}`}> */}
                    <Button type="primary" size="large" onClick={handleCreateOrder} >
                        Оформить заказ
                    </Button>
                {/* </Link> */}
                
                
            </div>
        </div>
    )
}

export default BurgerConstructor;