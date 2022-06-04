import { useSelector } from "react-redux";
import { Middleware, MiddlewareAPI } from "redux";
import { getToken } from "../../utils/utils";
import { RootState } from "../logic/rootReducer";
import { AppDispatch } from "../logic/store";

interface IWsAction {
    // wsInit: string; 
    onOpen: string; 
    onClose: string; 
    onError: string; 
    onOrder: string;
    onStart: string;
}

export const socketMiddleware = (wsUrl: string, wsActions: IWsAction): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;
  
      return (next) => (action) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { onOpen, onClose, onError, onOrder, onStart } = wsActions;
        
        if(type === onStart) {
          socket = new WebSocket(`${wsUrl}${payload}`);
        }
        
        if (socket) {
          socket.onopen = () => {
            dispatch({
              type: onOpen,
              payload: undefined
            });
          };
  
          socket.onerror = () => {
            dispatch({
              type: onError,
              payload: undefined
            });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            
            dispatch({ type: onOrder, payload: parsedData });
          };

          if (onClose && type === onClose && socket) {
            socket.close();
            socket = null;
          }
  
        }

        
  
        next(action);
      };
    };
  };