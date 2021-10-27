import React, { Fragment, useEffect, useImperativeHandle, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalBaseProps {
  children: React.ReactNode;
  show: boolean;
  onCancel: () => void;
}

type ModalBaseHandle = {
  close: () => void;
};

const ModalBase = React.forwardRef<ModalBaseHandle, ModalBaseProps>((props, ref) => {
  const { children, show = true, onCancel } = props;
  const [isOpen, setIsOpen] = useState(show);

  useEffect(() => setIsOpen(show), [show]);

  useImperativeHandle(ref, () => ({
    close: () => setIsOpen(false),
  }));

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onCancel} open>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
});

export default ModalBase;
