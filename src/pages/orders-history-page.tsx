import { useEffect } from 'react';
import { IOrders, wsConnectionClosed, wsConnectionError, wsConnectionSuccess } from '../services/actions/ws-feed';
import { useDispatch, useSelector } from '../services/logic/store';
import { convertYandexTokenToTokenApi, getToken } from '../utils/utils';
import OrdersHistoryOrderPage from './orders-history-order-page';
import styles from './orders-history-page.module.css';

const OrdersHistoryPage = () => {
    const history = useSelector(store => store.feed.orders)
    const dispatch = useDispatch();
    
    useEffect(() => {
        const token = getToken();
        const accessToken = token?.token.replace('Bearer ', '');
        
        dispatch(wsConnectionSuccess(`?token=${accessToken}`))
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch])
    
    return (
        <div className={styles.orders}>
            {history ? 
                history.orders.map((el: IOrders) => {
                    return(
                        <OrdersHistoryOrderPage key={el._id} order={el as IOrders} />
                    )
                    
                })
            :
                <div>Заказов пока нет</div>
            }
        </div>
    )
}

export default OrdersHistoryPage;