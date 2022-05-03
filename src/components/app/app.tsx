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
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from '../pages/login-page';
import RegisterPage from '../pages/register-page';
import ForgotPasswordPage from '../pages/forgot-password-page';
import ResetPasswordPage from '../pages/reset-password-page';
import ProfilePage from '../pages/profile-page';
import ProtectedPage from '../pages/protected-page';
import Provider from '../pages/provider';
import Page404 from '../pages/page404';
import PrivatePage from '../pages/private-page';
import { useLocation, useHistory } from 'react-router-dom';
import IngredientDetailsPage from '../pages/ingredient-details-page';

interface ILocationState {
  state: any;
  background: string | undefined
}

function App() {

  const ModalSwitch = () => {

    const location = useLocation() as unknown as ILocationState;
    const history = useHistory();
    let background = location.state && location.state.background;
    

    const handleModalClose = () => {
      history.goBack();
    };

    return (
      <Provider>
          <AppHeader/>
          <main className={styles.main}>
          <Switch location={background || location}>
            <PrivatePage exact path="/login" component={()=>(<LoginPage/>)}/>
            <PrivatePage exact path="/register" component={()=>(<RegisterPage/>)}/>
            <PrivatePage exact path="/forgot-password" component={()=>(<ForgotPasswordPage/>)}/>
            <PrivatePage exact path="/reset-password" component={()=>(<ResetPasswordPage/>)}/>
            <ProtectedPage exact path="/profile" component={()=>(<ProfilePage/>)}/>
              <Route exact path='/'>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients onOpen={onOpenDetails}/>
                  <BurgerConstructor onOpen={onOpenOrder} />
                </DndProvider>
              </Route>
              <ProtectedPage path="/ingredients/:ingredientId" component={()=>(<IngredientDetailsPage />)}/>
              <Route
                path='/order'
                children={
                  <Modal header={<></>} open={openOrder} onClose={handleModalClose}> 
                    <OrderDetails/>
                  </Modal>
                }
              />
            <Route>
              <Page404/>
            </Route>
          </Switch>

          {background && (
            <Route
              exact
              path='/ingredients/:ingredientId'
            >
              <Modal header={<>Детали ингредиента</>} open={openDetails !== undefined} onClose={handleModalClose}>
                  <IngredientDetails ingredientDetails={openDetails}/>
              </Modal>
            </Route>
          )}
          </main>
      </Provider>


    )
}

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
        <Router>
            <ModalSwitch/>
        </Router>
    </div>
    
  );
}

export default App;
