import { Box, BoxProps, Text } from '@jpstudytest/react';
import type { Meta, StoryObj } from '@storybook/react';
export default {
	title: 'Surfaces/Box',
	component: Box,
	args: {
		children: <Text>Testando o elemento Box</Text>
	},
	argTypes: {
		children: {
			control: {
				disable: true
			}
		}
	}
} as Meta<BoxProps>;
export const Primary: StoryObj<BoxProps> = {};
