import React from 'react';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';
import { KVArr } from '../../utils/interfaces';
import { ThemeType } from '../../services/theme/ThemeProvider';

type IconType = 'success' | 'warning' | 'info' | 'error';

interface Props {
  title: string;
  message?: string;
  type: IconType;
  theme: ThemeType;
}

const NotificationIcon: React.FunctionComponent<{ type: IconType }> = ({ type }) => {
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
  const { title, message, type, theme } = props;

  toast.custom((options) => (
    <div
      className={`flex flex-row px-6 py-4 shadow-md rounded-lg max-w-sm overflow-clip ${theme.notification.containerStyle} ${
        options.visible ? 'animate-enter' : 'animate-leave'
      } duration-1000 ease-in-out`}
    >
      <div className="mr-2">
        <NotificationIcon type={type} />
      </div>
      <div className="ml-2 mr-6">
        <span className={`font-semibold ${theme.notification.textColor}`}>{title}</span>
        {message && <span className={`block ${theme.notification.textColor}`}>{message}</span>}
      </div>
    </div>
  ));
};

interface NotificationType {
  title: string;
  message?: string;
  theme: ThemeType;
}

const Notification = {
  success: ({ theme, title, message }: NotificationType): void => MakeNotification({ type: 'success', title, message, theme }),
  info: ({ theme, title, message }: NotificationType): void => MakeNotification({ type: 'info', title, message, theme }),
  warning: ({ theme, title, message }: NotificationType): void => MakeNotification({ type: 'warning', title, message, theme }),
  error: ({ theme, title, message }: NotificationType): void => MakeNotification({ type: 'error', title, message, theme }),
};

export default Notification;
