import { Box, Button, Tooltip, TooltipProps, TooltipProvider } from '@jpstudytest/react';
import type { Meta, StoryObj } from '@storybook/react';
export default {
	title: 'Surfaces/Tooltip',
	component: Tooltip,
	args: {
		content: 'Texto do tooltip',
		children: <Button>Passe o mouse</Button>
	},
	decorators: [
		(Story, context) => {
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
					<TooltipProvider>{Story()}</TooltipProvider>
				</Box>
			);
		}
	]
} as Meta<TooltipProps>;
export const Primary: StoryObj<TooltipProps> = {};
