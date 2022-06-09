import { createStore, applyMiddleware, ActionCreator, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { rootReducer, RootState } from './rootReducer';
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_ORDERS, WS_CONNECTION_START, TApplicationActions } from '../actions/ws-feed';
import { compose } from 'redux';
import { socketMiddleware } from '../middleware/socket-middleware';
import thunkMiddleware from 'redux-thunk';
import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from 'react-redux';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  onOpen: WS_CONNECTION_START,
  onOrder: WS_GET_ORDERS,
  onStart: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
};

export const store = createStore(rootReducer, enhancer);

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions)))
);
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();