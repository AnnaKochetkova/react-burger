import { useCallback, useState, useEffect, ChangeEvent } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients, { IListItemIngredient } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../Ingredient-details/Ingredient-details';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page';
import ProfilePage from '../../pages/profile-page';
import ProtectedPage from '../../pages/protected-page';
import Provider from '../../pages/provider';
import Page404 from '../../pages/page404';
import PrivatePage from '../../pages/private-page';
import FeedPage from '../../pages/feed-page';
import OrdersPage from '../../pages/orders-page';
import FeedOrderPage from '../../pages/feed-order-page';
import { useLocation, useHistory } from 'react-router-dom';
import WrapperModalIngredient from '../Ingredient-details/wrapper-modal-ingredient';
import { getIngredients } from '../../services/actions/ingredients';
import IngredientDetailsPage from '../../pages/ingredient-details-page';
import WrapperModalFeed from '../feed-details/wrapper-modal-feed';
import { IOrders } from '../../services/actions/ws-feed';
import { useDispatch } from '../../services/logic/store';
import HistoryOrderPage from '../../pages/history-order-page';

interface ILocationState {
  state: any;
  background: string | undefined
}

function App() {

  const ModalSwitch = () => {

    const location = useLocation() as unknown as ILocationState;
    const history = useHistory();
    const background = location.state && location.state.background;

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
            <ProtectedPage exact path="/profile/orders" component={()=>(<OrdersPage/>)}/>
            <Route exact path='/'>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients onOpen={onOpenDetails}/>
                <BurgerConstructor onOpen={onOpenOrder} />
              </DndProvider>
            </Route>
            <Route path="/feed/:numberOrder" component={()=>(<FeedOrderPage />)}/>
            <Route path="/profile/orders/:numberOrder" component={()=>(<HistoryOrderPage />)}/>
            <Route path="/ingredients/:ingredientId" component={()=>(<IngredientDetailsPage />)}/>
            <Route
              path='/order'
              children={
                <Modal header={<></>} open={openOrder} onClose={handleModalClose}> 
                  <OrderDetails/>
                </Modal>
              }
            />
              
            <Route exact path='/feed'>
                <FeedPage onOpen={onOpenDetailsOrder}/>
            </Route>
            <Route>
              <Page404/>
            </Route>
          </Switch>
          {background && (
            <>
              <Route
                exact
                path='/ingredients/:ingredientId'
              >
                <WrapperModalIngredient/>
              </Route>
              <Route
                exact
                path='/feed/:numberOrder'
              >
                <WrapperModalFeed/>
              </Route>
              <Route
                exact
                path='/profile/orders/:numberOrder'
              >
                <WrapperModalFeed/>
              </Route>
            </>
            
          )}
          </main>
      </Provider>


    )
}

  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<IListItemIngredient | undefined>(undefined);
  const [openOrderDetails, setOpenOrderDetails] = useState<IOrders | undefined>(undefined);
  const dispatch = useDispatch();
  

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

  const onOpenDetailsOrder = (order: IOrders) => {
    setOpenOrderDetails(order);
  }

  useEffect(() => {
    dispatch(getIngredients());
    
  }, []);

  return (
    
    <div className="App">
        <Router>
            <ModalSwitch/>
        </Router>
    </div>
    
  );
}

export default App;