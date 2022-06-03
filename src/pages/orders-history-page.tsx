import { useEffect } from 'react';
import { IOrders, wsConnectionError, wsConnectionSuccess } from '../services/actions/ws-feed';
import { useDispatch, useSelector } from '../services/logic/store';
import { getToken } from '../utils/utils';
import OrdersHistoryOrderPage from './orders-history-order-page';
import styles from './orders-history-page.module.css';

const OrdersHistoryPage = () => {
    const history = useSelector(store => store.feed.orders)
    const dispatch = useDispatch();
    const token = getToken();
    
    useEffect(() => {
        dispatch(wsConnectionSuccess(`?token=${token}`))

        return () => {
            dispatch(wsConnectionError());
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