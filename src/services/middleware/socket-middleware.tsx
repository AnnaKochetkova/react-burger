import { useSelector } from "react-redux";
import { getToken } from "../../utils/utils";
import { RootState } from "../logic/rootReducer";
import { AppDispatch } from "../logic/store";

interface IWsAction {
    wsInit: string; 
    onOpen: string; 
    onClose: string; 
    onError: string; 
    onOrder: string;
}

export const socketMiddleware = (wsUrl: string, wsActions: IWsAction) => {
    return (store: { dispatch: any; getState: any; }) => {
      let socket: WebSocket | null = null;
  
      return (next: (arg0: any) => void) => (action: { type: any; payload: any; }) => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onError, onOrder } = wsActions;
        console.log(getState(), 'getState')
        const { user } = getState().authorization;
        
        const token = getToken();
        if(type === wsInit && user) {
          socket = new WebSocket(`${wsUrl}?token=${token}`);
        } else if (type === wsInit){
          socket = new WebSocket(`${wsUrl}/all`);
        }

        if (socket) {
          socket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: onOrder, payload: restParsedData });
          };
  
          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
        }
  
        next(action);
      };
    };
  };