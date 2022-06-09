import { Link, useHistory } from "react-router-dom";
import { AUTHORIZATION_ACCOUNT } from "../services/actions/authorization";
import { useDispatch } from "../services/logic/store";
import api from "../utils/api";
import { setToken } from "../utils/utils";
import OrdersHistoryPage from "./orders-history-page";
import styles from './profile-page.module.css';

const OrdersPage = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();

    const logout = async () => {
        const result = api.logout();
        if((await result).success){
            setToken(undefined);
            
            dispatch({
                type: AUTHORIZATION_ACCOUNT,
                payload: undefined,
            })
            history.push(`/`);
            console.log(result, 'все ок')
        }
        else console.log(result, 'все не ок')
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.buttons}>
                    <Link to="/profile" className={`text text_type_main-medium text_color_inactive ${styles.link} `}>Профиль</Link>
                    <Link to="/profile/orders" className={`text text_type_main-medium text_color_inactive ${styles.link} ${styles.active}`}>История заказов</Link>
                    <button onClick={logout} className={`text text_type_main-medium text_color_inactive ${styles.button}`}>Выход</button>
                </div>
                
            </div>
            <OrdersHistoryPage/>
        </div>
    )
}

export default OrdersPage;