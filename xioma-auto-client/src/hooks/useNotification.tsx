import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface openProps {
	message: string;
	description: string;
	type: NotificationType,
	placement?: NotificationPlacement,
}

export const useNotification = () => {
	const [api, contextHolder] = notification.useNotification();

	const openNotification = ({message, description, type, placement = 'topRight'}: openProps) => {
		api[type]({
			message,
			description,
			placement: placement,
		});
	};
	
	return {
		contextHolder,
		openNotification,
	}
};