import {IModalOverlayProps} from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export interface IModalHeaderProps extends IModalOverlayProps{
    children: JSX.Element | JSX.Element[];
}

const ModalHeader = (props: IModalHeaderProps) => {
    return(
        <div className={styles.modalHeader}>
            <div className={`ml-10 mt-10 mr-10 text text_type_main-medium ${styles.headerContent}`}>
                {props.children}
                <button className={styles.button} onClick={props.onClose}>
                    <CloseIcon type="primary" />
                </button>
            </div>
        </div>
    )
}

export default ModalHeader;