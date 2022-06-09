import { RootState } from '../../services/logic/rootReducer';
import { ConstructorElement, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import question from '../../images/question.png'
import { useSelector } from '../../services/logic/store';

interface IConstructorBunsProps {
    typeBun: 'top' | 'bottom',
    typeText: '(верх)' | '(низ)'
}

const ConstructorBuns = (props: IConstructorBunsProps) => {

    const bun = useSelector(store => store.constructor.buns)
    return (
        <>
        {
            bun !== undefined ? (
                <ConstructorElement
                    type={props.typeBun}
                    isLocked={true}
                    text={`${bun.name} ${props.typeText}`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            ) : (
                <ConstructorElement
                    type={props.typeBun}
                    isLocked={true}
                    text='Добавьте булочку в блок'
                    price={0}
                    thumbnail={question}
                />
            )
        }
        </>
    )
}

export default ConstructorBuns;