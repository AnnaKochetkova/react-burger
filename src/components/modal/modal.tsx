import { createPortal } from "react-dom";
import {IModalHeaderProps } from './modal-header';
import ModalHeader from "./modal-header";
import ModalOverlay from "./modal-overlay";
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
        const handlerEvent = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener('keydown', handlerEvent);
        return () => {
            window.removeEventListener('keydown', handlerEvent);
        }
    }, [])

    useEffect(() => {
        const body = document.getElementsByTagName('body');
        if(open) {
            body[0].style.overflow = 'hidden';
            body[0].style.width = 'calc(100% - 17px)';
        } else {
            body[0].removeAttribute('style')
        }
    }, [open]);
    if(open === false && modalRoot !== null) return null;

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