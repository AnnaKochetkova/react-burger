import { ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { IListItemIngredient } from "../components/burger-ingredients/burger-ingredients";
import { IOrders } from "../services/actions/ws-feed";
import { RootState } from "../services/logic/rootReducer";
import { useSelector } from "../services/logic/store";
import { sayDate } from "../utils/say-date";
import styles from './feed-page.module.css';

interface IProps {
    order: IOrders;
    onClick: ()=>void
}

const FeedContainerPage = (props: IProps) => {
    const location = useLocation();
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const masIngredients = ingredients.filter(el => props.order.ingredients.includes(el._id));
    const price = masIngredients.reduce((prev, curr) => curr.type === 'bun' ? (prev + curr.price * 2) : (prev + curr.price), 0);
    const renderMas = masIngredients.filter((_, index) => index < 5);

    const date = sayDate(props.order.createdAt)
    return (
        <Link to={{pathname: `/feed/${props.order.number}`, state: { background: location }}} className={styles.order} onClick={props.onClick}>
            <div className={styles.number}>
                <p className="text text_type_digits-default">#{props.order.number}</p>
                <p className="text text_type_main-default text_color_inactive">{date}</p>
            </div>
            <p className={`text text_type_main-medium ml-6 ${styles.name}`}>{props.order.name}</p>
            <div className={`${styles.ingredients} ml-6`}>
                <div className={styles.wrapper}>
                    {
                        renderMas.map((el, index) => {
                            if(index === 4 && renderMas.length < masIngredients.length){
                                return (
                                    <div className={styles.numberContainer} key={el._id}>
                                        <img className={styles.image} src={el.image}/>
                                        <div className={`${styles.numberIng} text text_type_digits-default`}>+ {masIngredients.length - renderMas.length}</div>
                                    </div>
                                    
                                )
                            }
                            return (
                                <img key={el._id} className={styles.image} src={el.image}/>
                            )
                        })
                    }
                </div>
                <div className={styles.total}>
                    <p className="text text_type_digits-default mr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}

export default FeedContainerPage;