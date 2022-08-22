import React from 'react';
import { Icon } from '@iconify/react';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  hasActionsButtons?: boolean;
  onConfirm?: VoidFunction;
  onClose?: VoidFunction;
}

const Modal: React.FC<ModalProps> = ({ children, open, hasActionsButtons, onConfirm, onClose }) => {
  return (
    <div className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => (onClose ? onClose() : () => null)}>
          <Icon icon="ic:round-close" className="w-5 h-5" />
        </button>
        {children}
        {hasActionsButtons && (
          <div className="modal-action">
            <button
              type="button"
              onClick={() => (onConfirm ? onConfirm() : () => null)}
              className="btn btn-success btn-outline btn-block font-medium sm:ml-3 sm:w-auto sm:text-sm"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => (onClose ? onClose() : () => null)}
              className="btn btn-error btn-outline btn-block mt-3 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Modal.defaultProps = {
  hasActionsButtons: true,
  onConfirm: () => null,
  onClose: () => null,
};

export default Modal;
