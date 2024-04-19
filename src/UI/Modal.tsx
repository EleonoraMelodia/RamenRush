import React, { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose, className = "" }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal?.showModal();
    }

    return () => {
      modal?.close()
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
