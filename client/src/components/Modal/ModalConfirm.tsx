import React from 'react';
import { Icon } from '@iconify/react';
import ReactDOM from 'react-dom';
import ModalBase from './ModalBase';
import { ThemeType } from '../../services/theme/ThemeProvider';

interface ModalConfirmProps {
  title: string;
  message: string;
  onOk: () => void;
  onCancel?: () => void;
  theme: ThemeType;
}

const ModalConfirm = ({ title, message, onOk, onCancel = () => null, theme }: ModalConfirmProps): void => {
  // Create fake element to insert modal
  const div = document.createElement('div');
  document.getElementById('root')?.appendChild(div);

  const modal = React.createRef<React.ElementRef<typeof ModalBase>>();

  const close = (confirmed: boolean) => {
    if (confirmed) {
      onOk();
    } else {
      onCancel();
    }

    modal.current?.close();

    // Wait for the modal exit animation before to unmount component
    setInterval(() => {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }, 1000);
  };

  const render = () => {
    // Trick to not block React events on sync render, make it async
    setTimeout(() => {
      ReactDOM.render(
        <ModalBase ref={modal} show onCancel={() => close(false)}>
          <div
            className={`inline-block my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-lg sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${theme.modalConfirm.containerStyle}`}
          >
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${theme.modalConfirm.iconHalo}`}
                >
                  <Icon icon="ic:round-warning-amber" className={`w-6 h-6 mb-1 ${theme.modalConfirm.iconColor}`} />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className={`text-lg leading-6 font-medium ${theme.modalConfirm.titleColor}`} id="modal-title">
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className={`text-sm ${theme.modalConfirm.textColor}`}>{message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => close(true)}
                className={`w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 font-medium sm:ml-3 sm:w-auto sm:text-sm ${theme.modalConfirm.confirmButton}`}
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => close(false)}
                className={`mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${theme.modalConfirm.cancelButton}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalBase>,
        div
      );
    });
  };

  render();
};

export default ModalConfirm;
