import React from 'react';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';

type IconType = 'success' | 'warning' | 'info' | 'error';

interface Props {
  title: string;
  message?: string;
  type: IconType;
}

const NotificationIcon: React.FC<{ type: IconType }> = ({ type }) => {
  switch (type) {
    case 'success':
      return <Icon icon="ic:round-check-circle-outline" className="w-6 h-6 text-green-500" />;
    case 'warning':
      return <Icon icon="ic:round-warning-amber" className="w-6 h-6 text-yellow-500" />;
    case 'error':
      return <Icon icon="ic:round-error-outline" className="w-6 h-6 text-red-500" />;
    default:
      return <Icon icon="ic:outline-info" className="w-6 h-6 text-blue-400" />;
  }
};

const MakeNotification = (props: Props) => {
  const { title, message, type } = props;

  toast.custom((options) => (
    <div
      className={`flex flex-row px-6 py-4 shadow-md rounded-box max-w-sm overflow-clip border border-base-300 bg-base-100 ${
        options.visible ? 'animate-enter' : 'animate-leave'
      } duration-1000 ease-in-out`}
    >
      <div className="mr-2">
        <NotificationIcon type={type} />
      </div>
      <div className="ml-2 mr-6">
        <span className="font-semibold">{title}</span>
        {message && <span className="block">{message}</span>}
      </div>
    </div>
  ));
};

interface NotificationType {
  title: string;
  message?: string;
}

const Notification = {
  success: ({ title, message }: NotificationType): void => MakeNotification({ type: 'success', title, message }),
  info: ({ title, message }: NotificationType): void => MakeNotification({ type: 'info', title, message }),
  warning: ({ title, message }: NotificationType): void => MakeNotification({ type: 'warning', title, message }),
  error: ({ title, message }: NotificationType): void => MakeNotification({ type: 'error', title, message }),
};

export default Notification;
