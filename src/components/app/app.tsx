import { useCallback, useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients, { IListItemIngredient } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../Ingredient-details/Ingredient-details';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

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
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients onOpen={onOpenDetails}/>
            <BurgerConstructor onOpen={onOpenOrder} />
          </DndProvider>
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
