import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteConstructorIngredient } from '../../services/actions/constructor-ingredients';
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { IListItemIngredient } from '../burger-ingredients/burger-ingredients';
import { useDispatch } from '../../services/logic/store';

interface IConstructorElementIngredientProps {
    index: number,
    el: IListItemIngredient,
    moveCard: (dragIndex: number, hoverIndex: number)=>void
}

interface ClientOffset {
    x: number;
    y: number;
}

interface IItemHover {
    id: string,
    index: number
}

const ConstructorElementIngredient = (props: IConstructorElementIngredientProps) => {

    const {name, price, image} = props.el;

    const dispatch = useDispatch();

    const ref  = useRef<HTMLDivElement>(null);

    const [{handlerId} , drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            const itemHover = item as IItemHover
            if(!ref.current) {
                return;
            }
            const dragIndex = itemHover.index;
            const hoverIndex = props.index;
            if(dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if(clientOffset !== null){
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                props.moveCard(dragIndex, hoverIndex);
                itemHover.index = hoverIndex;
            }
            
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: props.el._id, index: props.index }),
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    if (props.el.type !== 'bun') drag(drop(ref));

    const preventDefault = (e: Event) => e.preventDefault();

    return (
        <div className={styles.dopIngr} ref={ref} style={{ opacity }}  data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={props.el.name}
                price={props.el.price}
                thumbnail={props.el.image}
                handleClose={()=>dispatch(deleteConstructorIngredient(props.index))}
            />
        </div>

    )
}

export default ConstructorElementIngredient;