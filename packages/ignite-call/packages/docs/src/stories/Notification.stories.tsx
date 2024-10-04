import {
	Box,
	Button,
	Notification,
	NotificationProps,
	NotificationProvider
} from '@jpstudytest/react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
export default {
	title: 'Surfaces/Notification',
	component: Notification,
	args: {
		title: 'Título da notificação',
		description: 'descrição da notificação'
	},
	decorators: [
		(Story, context) => {
			const [openState, setOpen] = useState(false);

			return (
				<Box
					as="label"
					css={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						position: 'relative'
					}}
				>
					<Button
						onClick={() => {
							setOpen(ps => !ps);
						}}
					>
						{!openState ? 'Ver' : 'Fechar'} Notificação
					</Button>
					<NotificationProvider>
						{Story({
							args: {
								...context.args,
								open: openState,
								onOpenChange(open) {
									setOpen(open);
								}
							}
						})}
					</NotificationProvider>
				</Box>
			);
		}
	]
} as Meta<NotificationProps>;
export const Primary: StoryObj<NotificationProps> = {};
