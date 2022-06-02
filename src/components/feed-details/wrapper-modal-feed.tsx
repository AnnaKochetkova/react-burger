import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IOrders } from "../../services/actions/ws-feed";
import { RootState } from "../../services/logic/rootReducer";
import { IListItemIngredient } from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import FeedDetails from "./feed-details";

interface PageParams {
    numberOrder?: string;
}

const WrapperModalFeed = () => {
    const [feed, setFeed] = useState<IOrders | undefined>(undefined)
    let params = useParams<PageParams>();
    const history = useHistory();
    const feedOrder = useSelector((store: RootState) => store.feed.orders);

    const ingredients = useSelector((store: RootState) => store.ingredients.ingredients);
    const masIngredients = ingredients.filter(el => feed?.ingredients.includes(el._id));
    const price = masIngredients.reduce((prev: number, curr: IListItemIngredient) => curr.type === 'bun' ? (prev + curr.price * 2) : (prev + curr.price), 0);

    console.log(params, 'params')
    const handleModalClose = () => {
        history.goBack();
        setFeed(undefined);
    };

    useEffect(() => {
        if (params.numberOrder && feed?.number !== parseInt(params.numberOrder) && feedOrder !== undefined) {
            let ingred = feedOrder.orders.find((el: IOrders) => el.number === parseInt(params?.numberOrder || '0'))
            setFeed(ingred);
        }
        console.log(feed?.number, 'feed?.number')
    }, [params, feedOrder]);
    return (
        <Modal header={<></>} open={feed !== undefined} onClose={handleModalClose}>
            <FeedDetails feedDetails={feed} price={price} masIngredients={masIngredients}/>
        </Modal>
    )
}

export default WrapperModalFeed;