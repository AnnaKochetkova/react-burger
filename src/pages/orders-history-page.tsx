import { useSelector } from 'react-redux';
import { IOrders } from '../services/actions/ws-feed';
import { RootState } from '../services/logic/rootReducer';
import OrdersHistoryOrderPage from './orders-history-order-page';
import styles from './orders-history-page.module.css';

const OrdersHistoryPage = () => {
    const history = useSelector((store: RootState) => store.feed.orders)
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