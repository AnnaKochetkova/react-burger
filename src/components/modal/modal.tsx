import { createPortal } from "react-dom";
import {IModalHeaderProps } from './modal-header';
import ModalHeader from "./modal-header";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import { useEffect } from "react";

const modalRoot = document.getElementById("react-modals");

interface IModalProps extends IModalHeaderProps {
    open: boolean;
    header: JSX.Element | JSX.Element[];
}

const Modal = (props: IModalProps) => {
    const { children, header, onClose, open } = props;

    useEffect(() => {
        const handlerEventOnEsc = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener('keydown', handlerEventOnEsc);
        return () => {
            window.removeEventListener('keydown', handlerEventOnEsc);
        }
    }, [])

    if(!open && modalRoot !== null) return null;

    return createPortal(
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <ModalHeader onClose={onClose}>{header}</ModalHeader>
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </div>,
      modalRoot as HTMLElement 
    );
  
} 
export default Modal;