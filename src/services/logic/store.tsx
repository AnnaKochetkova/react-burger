import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_ORDERS, WS_CONNECTION_START } from '../actions/ws-feed';
import { compose } from 'redux';
import { socketMiddleware } from '../middleware/socket-middleware';
import thunkMiddleware from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOrder: WS_GET_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS,
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