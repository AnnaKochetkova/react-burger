import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IListItemIngredient } from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import { RootState } from "../../services/logic/rootReducer";
import IngredientDetails from "./Ingredient-details";
import { useSelector } from "../../services/logic/store";

interface PageParams {
    ingredientId: string;
}

const WrapperModalIngredient = () => {
    const [ing, setIng] = useState<IListItemIngredient | undefined>(undefined)
    let params = useParams<PageParams>();
    const history = useHistory();
    const ingredients = useSelector(store => store.ingredients.ingredients);

    const handleModalClose = () => {
        history.goBack();
        setIng(undefined);
      };

    useEffect(() => {
        if (params.ingredientId && ing?._id !== params.ingredientId) {
            let ingred = ingredients.find((el) => el._id === params.ingredientId)
            console.log(ingredients,'ingredients')
            console.log(ingred, 'ingred')
            setIng(ingred);
        }
    }, [params, ingredients]);
    return (
        <Modal header={<>Детали ингредиента</>} open={ing !== undefined} onClose={handleModalClose}>
            <IngredientDetails ingredientDetails={ing}/>
        </Modal>
    )
}

export default WrapperModalIngredient;