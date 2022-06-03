import { useEffect } from "react";
import { autoauth } from "../services/actions/autoauth";
import { useDispatch, useSelector } from "../services/logic/store";

interface IProviderProps {
    children: JSX.Element[]
}
const Provider = ({ children }: IProviderProps) => {
    const isReady = useSelector(store => store.authorization.isReady);
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