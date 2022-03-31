import styles from './modal-overlay.module.css';

export interface IModalOverlayProps {
    onClose: ()=>void;
}

const ModalOverlay = (props: IModalOverlayProps) => {
    return(
        <div className={styles.overlay} onClick={props.onClose}/>
    )
}

export default ModalOverlay;