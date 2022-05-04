import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IListItemIngredient } from "../burger-ingredients/burger-ingredients";
import api from "../../utils/api";
import Modal from "../modal/modal";
import IngredientDetails from "./Ingredient-details";

interface PageParams {
    ingredientId: string;
}

const WrapperModalIngredient = () => {
    const [ing, setIng] = useState<IListItemIngredient | undefined>(undefined)
    let params = useParams<PageParams>();
    const history = useHistory();

    const handleModalClose = () => {
        history.goBack();
        setIng(undefined);
      };

    useEffect(() => {
        if (params.ingredientId) {
            api.getByIdIngredient(params.ingredientId).then((i) => setIng(i));
        }
    }, [params]);
    return (
        <Modal header={<>Детали ингредиента</>} open={ing !== undefined} onClose={handleModalClose}>
            <IngredientDetails ingredientDetails={ing}/>
        </Modal>
    )
}

export default WrapperModalIngredient;