import React from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  children: any;
  show: boolean;
  close: any;
};
const Modal = ({ children, show, close }: ModalProps) => {
  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <i className="fa fa-times" onClick={close} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
