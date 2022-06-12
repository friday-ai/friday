import React from 'react';
import { createRoot } from 'react-dom/client';
import { Icon } from '@iconify/react';

interface ModalConfirmProps {
  title: string;
  message: string;
  onOk: VoidFunction;
  onCancel?: VoidFunction;
}

const ModalConfirm = ({ title, message, onOk, onCancel = () => null }: ModalConfirmProps): void => {
  // Get modal element in DOM
  const root = createRoot(document.getElementById('modal')!);

  const close = (confirmed: boolean) => {
    document.getElementsByClassName('modal')[0].classList.remove('modal-open');
    if (confirmed) {
      onOk();
    } else {
      onCancel();
    }

    // Wait for the modal exit animation before to unmount component
    setInterval(() => {
      root.unmount();
    }, 1000);
  };

  const render = () => {
    // Trick to not block React events on sync render, make it async
    setTimeout(() => {
      root.render(
        <div className="modal modal-open flex items-center">
          <div className="bg-base-100 border border-base-300 rounded-box m-8 inline-block align-middle text-left transition-all transform">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 bg-error bg-opacity-20 text-error">
                  <Icon icon="ic:round-warning-amber" className="w-6 h-6 mb-1 text-error" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium" id="modal-title">
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm">{message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" onClick={() => close(true)} className="btn btn-error btn-block font-medium sm:ml-3 sm:w-auto sm:text-sm">
                Confirm
              </button>
              <button type="button" onClick={() => close(false)} className="btn-neutral btn-block mt-3 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  render();
};

export default ModalConfirm;
