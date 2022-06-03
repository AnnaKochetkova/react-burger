export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_START = 'WS_CONNECTION_START';

export interface IOrders {
  ingredients: string[];
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface DataMessage {
  success: boolean;
  orders: IOrders[];
  total: number;
  totalToday: number;
}

export interface IwsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: string
}
export interface IwsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IwsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IwsGetOrder {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: DataMessage;
}


export const wsConnectionSuccess = (wsConnect: string): IwsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
    payload: wsConnect,
  };
};

export const wsConnectionError = (): IwsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IwsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetOrder = (message: DataMessage): IwsGetOrder => {
    return {
      type: WS_GET_ORDERS,
      payload: message
    };
};

export type TApplicationActions = 
  | IwsConnectionSuccess
  | IwsConnectionError
  | IwsConnectionClosed
  | IwsGetOrder;