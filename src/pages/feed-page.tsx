import { useEffect } from "react";
import { IOrders, wsConnectionClosed, wsConnectionError, wsConnectionSuccess, WS_CONNECTION_SUCCESS } from "../services/actions/ws-feed";
import { useDispatch, useSelector } from "../services/logic/store";
import FeedContainerPage from "./feed-container-page";
import styles from './feed-page.module.css';

export type TOnOpenOrderDetails = (item: IOrders) => void;

interface IBurgerIngredientsProps {
    onOpen: TOnOpenOrderDetails;
}

const FeedPage = (props: IBurgerIngredientsProps) => {
    const feed = useSelector(store => store.feed.orders)
    const done = feed?.orders.filter((el) => el.status === 'done');
    const pending = feed?.orders.filter((el) => el.status === 'pending');
    const { onOpen } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('connect')
        dispatch(wsConnectionSuccess('/all'))

        return () => {
            dispatch(wsConnectionClosed());
        };
    
    }, [dispatch])


    return (
        <div className={styles.container}>
            <p className="text text_type_main-large">
                Лента заказов
            </p>
            <div className={styles.main}>
                <div className={styles.orders}>
                    {feed ? 
                        feed.orders.map((el: IOrders) => {
                            return(
                                <FeedContainerPage key={el._id} order={el as IOrders} onClick={() => onOpen(el)}/>
                            )
                            
                        })
                    :
                        <div>Заказов пока нет</div>
                    }
                    
                </div>
                <div className={styles.mainOrders}>
                    <div className={styles.ordersNumber}>
                        <div className={styles.ready}>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={`${styles.numbers} ${styles.color}`}>
                                {
                                    done?.map((el: IOrders) => {
                                        return (
                                            <p key={el._id} className="text text_type_digits-default mb-2">{el.number}</p>
                                        )
                                    })
                                }
                                
                                
                            </div>
                        </div>
                        <div className={styles.inwork}>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={styles.numbers}>
                                {
                                    pending?.map((el: IOrders) => {
                                        return (
                                            <p key={el._id} className="text text_type_digits-default mb-2">{el.number}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.totalOrders}>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className='text text_type_digits-large'>{feed?.total}</p>
                    </div>
                    <div className={styles.totalOrdersToday}>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large">{feed?.totalToday}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedPage;