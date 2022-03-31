import { useCallback, useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients, { IListItemIngredient } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../Ingredient-details/Ingredient-details';

function App() {
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<IListItemIngredient | undefined>(undefined);
  const url = 'https://norma.nomoreparties.space/api/ingredients';

  const [list, setList] = useState([]);

  useEffect(() => {
    (async function(){
      try {
          let response = await fetch(url);
          let result = await response.json();
          setList(result.data); 
      } catch (error) {
          console.log(error);
      }
 
    }())
  }, [])

  const onClose = useCallback(() => {
    setOpenOrder(false);
    setOpenDetails(undefined);
  }, []);

  const onOpenOrder = () => {
    setOpenOrder(true);
  }

  const onOpenDetails = (item: IListItemIngredient) => {
    setOpenDetails(item);
  }

  return (
    <div className="App">
      <AppHeader/>
      <main className={styles.main}>
          <BurgerIngredients onOpen={onOpenDetails} list={list}/>
          <BurgerConstructor onOpen={onOpenOrder} list={list}/>
          <Modal header={<></>} open={openOrder} onClose={onClose}> 
              <OrderDetails/>
          </Modal>
          <Modal header={<>Детали ингредиента</>} open={openDetails !== undefined} onClose={onClose}> 
              <IngredientDetails ingredientDetails={openDetails}/>
          </Modal>
      </main>
    </div>
  );
}

export default App;
