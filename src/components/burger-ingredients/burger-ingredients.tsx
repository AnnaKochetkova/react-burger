import { useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient';
import { groupBy } from '../../utils/group-by';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/logic/rootReducer';


export interface IListItemIngredient {
    type: 'bun' | 'sause' | 'main';
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

const transleteTitle: TTransleteTitle = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
}

export type TOnOpenBurgerIngredient = (item: IListItemIngredient) => void;

interface IBurgerIngredientsProps {
    onOpen: TOnOpenBurgerIngredient;
}

const BurgerIngredients = (props: IBurgerIngredientsProps) => {

    const {ingredientsRequest, ingredientsError} = useSelector((store: RootState) => ({...store.ingredients}))

    const elemsRef = useRef<Array<HTMLDivElement | null>>([]);
    const containerRef = useRef(null);

    const list = useSelector((store: RootState) => store.ingredients.ingredients);
    // const dispatch = useDispatch();

    const [current, setCurrent] = useState('bun');

    const { onOpen } = props;
    const group = groupBy<IListItemIngredient>(list, (item) => item.type);

    const visible = function (target: HTMLDivElement) {
        var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
            containerPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };

        if (targetPosition.bottom > containerPosition.top && 
            targetPosition.top < containerPosition.bottom && 
            targetPosition.right > containerPosition.left && 
            targetPosition.left < containerPosition.right) { 
            return true;
        } else {
            return false;
        };
    };

    const handleScroll = () => {
        switch (true) {
            case visible(elemsRef.current[0] as HTMLDivElement):
                setCurrent('bun');
                console.log('bun');
                break;
      
            case visible(elemsRef.current[2] as HTMLDivElement):
                setCurrent('sauce');
                console.log('sauce');
                break;
            case visible(elemsRef.current[1] as HTMLDivElement):
                setCurrent('main');
                console.log('main');
                break;
            default:
                setCurrent('sauce');
                break;
        }
    }

    // useEffect(() => {
    //     dispatch(getIngredients());
    // }, []);

    return (
        <div className={styles.container}>
            <p className={`text text_type_main-large ${styles.text}`}>
                Соберите бургер
            </p>
            <div className={styles.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
            </div>
            <div className={styles.allIngredients} ref={containerRef} onScroll={handleScroll}>

                {
                    ingredientsRequest ? '' : 
                    ingredientsError ? <div>Произошла ошибка</div> :
                    Object.keys(group).map((key, i) => {
                        const getRef = (element: HTMLDivElement | null) => (elemsRef.current[i] = (element))
                        return (
                            <div key={key} ref={getRef} >
                                <p className={`text text_type_main-medium mt-10 mb-5 ${styles.headerText}`}>{transleteTitle[key]}</p>
                                <div className={styles.ingredientsCategory}>
                                    {
                                        group[key].map(el => {
                                            return (
                                                <Ingredient el={el} key={el._id} name={el.name} image={el.image} price={el.price} count={1} onClick={() => onOpen(el)} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BurgerIngredients;