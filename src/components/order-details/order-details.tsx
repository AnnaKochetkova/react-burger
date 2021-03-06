import styles from './order-details.module.css';
import orderImage from '../../images/order.png';
import { RootState } from '../../services/logic/rootReducer';
import { useSelector } from '../../services/logic/store';

const OrderDetails = () => {
    
    const order = useSelector(store => store.order.order);
    
    const {orderRequest, orderError} = useSelector(store => ({...store.order}))
    return(
        <>
        {
            orderRequest ? <div className='text text_type_main-medium mb-8'>Идет загрузка...</div> : 
            orderError ? <div>Произошла ошибка</div> :
            <div className={`${styles.order} mb-30`}>
                <p className='text text_type_digits-large mb-8'>{order}</p>
                <p className='text text_type_main-default mb-15'>идентификатор заказа</p>
                <img className={styles.orderImg} src={orderImage} alt="order" />
                <p className='text text_type_main-small mt-15 mb-2'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
            </div>
        }
        </>
    )
}

export default OrderDetails;