import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoauth } from "../services/actions/autoauth";
import { RootState } from "../services/logic/rootReducer";

interface IProviderProps {
    children: JSX.Element[]
}
const Provider = ({ children }: IProviderProps) => {
    const isReady = useSelector((store: RootState) => store.authorization.isReady);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(autoauth());
    }, [dispatch])
    if (isReady) {
        return (
            <>
                {children}
            </>
        )
    }
    return <></>
}

export default Provider;