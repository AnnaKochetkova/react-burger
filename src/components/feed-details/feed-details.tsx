import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { IOrders } from "../../services/actions/ws-feed";
import { RootState } from "../../services/logic/rootReducer";
import { sayDate } from "../../utils/say-date";
import { IListItemIngredient } from "../burger-ingredients/burger-ingredients";
import styles from './feed-details.module.css';

interface IFeedDetails {
    feedDetails: IOrders | undefined;
    price: number;
    masIngredients: IListItemIngredient[]
}

const FeedDetails = ({feedDetails, price, masIngredients}: IFeedDetails) => {
    let status = '';
    let date='';
    
    if(feedDetails?.status === 'done'){
        status = 'Выполнен'
    } else status = 'В процессе';

    if(feedDetails?.createdAt){
        date = sayDate(feedDetails.createdAt)
    }
    
    return (
        <div className={styles.container}>
            <p className="text text_type_digits-default mb-8">#{feedDetails?.number}</p>
            <p className="text text_type_main-medium mb-3">{feedDetails?.name}</p>
            <p className={`text text_type_main-default mb-15 ${styles.color}`}>{status}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={styles.ingredients}>
                {
                    masIngredients?.map(el => {
                        return (
                            <div key={el._id} className={`${styles.containerIngredients} mb-4`}>
                                <img className={styles.image} src={el.image}/>
                                <p className={`${styles.name} ml-4 mr-4 text text_type_main-default`}>{el.name}</p>
                                <div className={styles.totalContainer}>
                                    <p className={`text text_type_digits-default mr-2`}>{el.type === 'bun' ? '2' : '1'} x {el.price}</p>
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
                    <p className="text text_type_digits-default mr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default FeedDetails;