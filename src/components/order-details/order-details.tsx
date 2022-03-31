import styles from './order-details.module.css';
import order from '../../images/order.png';

const OrderDetails = () => {
    return(
        <div className={`${styles.order} mb-30`}>
            <p className='text text_type_digits-large mb-8'>034536</p>
            <p className='text text_type_main-default mb-15'>идентификатор заказа</p>
            <img className={styles.orderImg} src={order} alt="order" />
            <p className='text text_type_main-small mt-15 mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;