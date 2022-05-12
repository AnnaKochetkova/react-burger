/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../services/logic/rootReducer";
// @ts-ignore
interface PrivateRouteParams extends RouteProps {
    component:
      | React.ComponentType<RouteComponentProps<any>>
      | React.ComponentType<any>
  }

const ProtectedPage = ({
    component: Component,
     ...rest}: PrivateRouteParams) => {
    const user = useSelector((store: RootState) => store.authorization.user);

    return (
        <Route
            {...rest}
            render={(props) => 
                // @ts-ignore
                user ? (<Component {...props} />) : 
                (
                    <Redirect to={{pathname: '/login', state: { from: props.location }}}/>
                )
            }
        />
    )
}

export default ProtectedPage;