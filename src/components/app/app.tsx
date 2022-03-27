import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import AppHeader from '../app-header/app-header';
import BurgerIngredients, { IListItemIngredient } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details';
import IngredientDetails from '../modal/Ingredient-details';

function App() {
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<IListItemIngredient | undefined>(undefined);
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
          <BurgerIngredients onOpen={onOpenDetails}/>
          <BurgerConstructor onOpen={onOpenOrder}/>
          <Modal header={<></>} open={openOrder} onClose={onClose}> 
              <OrderDetails/>
          </Modal>
          <Modal header={<>Детали ингредиента</>} open={openDetails !== undefined} onClose={onClose}> 
              <IngredientDetails ingredients={openDetails}/>
          </Modal>
      </main>
    </div>
  );
}

export default App;
