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

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetOrder = (message: DataMessage) => {
    return {
      type: WS_GET_ORDERS,
      payload: message
    };
};