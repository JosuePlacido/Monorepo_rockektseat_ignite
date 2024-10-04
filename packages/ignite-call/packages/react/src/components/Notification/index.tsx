import * as Toast from '@radix-ui/react-toast';
import { X } from 'phosphor-react';

import {
	Close,
	NotificationContainer,
	NotificationDescription,
	NotificationTitle,
	Viewport
} from './styles';

export interface NotificationProps extends Toast.ToastProps {
	title: string;
	description: string;
}
export function Notification({ title, description, open, onOpenChange }: NotificationProps) {
	return (
		<NotificationContainer open={open} onOpenChange={onOpenChange}>
			<NotificationTitle>{title}</NotificationTitle>
			<NotificationDescription>{description}</NotificationDescription>
			<Close>
				<X size={20} />
			</Close>
		</NotificationContainer>
	);
}
Notification.displayName = 'Notification';
export function NotificationProvider({ children, ...props }: Toast.ToastProviderProps) {
	return (
		<Toast.Provider {...props}>
			{children}
			<Viewport />
		</Toast.Provider>
	);
}
