import { notification } from 'antd';
import React, { useEffect } from 'react';

interface NotificationToastProps {
  title: string;
  description: string;
  pauseOnHover: boolean;
}

export default function NotificationToast({
  title,
  description,
  pauseOnHover,
}: NotificationToastProps) {
  const [api] = notification.useNotification();

  // Directly show notification when the component renders
  useEffect(() => {
    if (title && description) {
      api.open({
        message: title,
        description: description,
        showProgress: true,
        pauseOnHover: false,
      });
    }
  }, [title, description, pauseOnHover, api]);

  return null; // No UI needed here
}
