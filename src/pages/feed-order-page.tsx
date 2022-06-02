import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IListItemIngredient } from "../components/burger-ingredients/burger-ingredients";
import { IOrders } from "../services/actions/ws-feed";
import { RootState } from "../services/logic/rootReducer";
import { sayDate } from "../utils/say-date";
import styles from './feed-order-page.module.css';

interface IParams {
    numberOrder: string;
}

const FeedOrderPage = () => {
    const [feed, setFeed] = useState<IOrders | undefined>(undefined)
    let params = useParams<IParams>();
    const feedOrders = useSelector((store: RootState) => store.feed.orders);
    const ingredients = useSelector((store: RootState) => store.ingredients.ingredients);
    const masIngredients = ingredients.filter(el => feed?.ingredients.includes(el._id));
    const price = masIngredients.reduce((prev: number, curr: IListItemIngredient) => curr.type === 'bun' ? (prev + curr.price * 2) : (prev + curr.price), 0);
    
    
    let status = '';
    if(feed?.status === 'done'){
        status = 'Выполнен'
    } else status = 'В процессе'
    let date = '';
    if(feed?.createdAt){
        date = sayDate(feed.createdAt)
    }
    useEffect(() => {
        if (params.numberOrder && feed?.number !== parseInt(params.numberOrder)) {
            let orders = feedOrders?.orders.find((el: IOrders) => el.number === parseInt(params.numberOrder))
            setFeed(orders);
        }
        console.log(masIngredients, 'mas')
    }, [params, feedOrders]);
    return (
        <div className={styles.container}>
            <p className="text text_type_digits-default mb-10">#{feed?.number}</p>
            <p className="text text_type_main-medium mb-3">{feed?.name}</p>
            <p className={`text text_type_main-default mb-15 ${styles.color}`}>{status}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={styles.ingredients}>
                {
                    masIngredients.map(el => {
                        return (
                            <div key={el._id} className={`${styles.containerIngredients} mb-4`}>
                                <img className={styles.image} src={el.image}/>
                                <p className={`${styles.name} ml-4 mr-4 text text_type_main-default`}>{el.name}</p>
                                <div className={styles.totalContainer}>
                                    <p className={`text text_type_digits-default mr-2`}>{el.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.totalTime}>
                <p className="text text_type_main-default text_color_inactive">{date}</p>
                <div className={styles.total}>
                    <p className="text text_type_digits-default">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default FeedOrderPage;