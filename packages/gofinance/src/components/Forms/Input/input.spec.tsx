import React from 'react';
import { render } from '@testing-library/react-native';
import Input from '.';
import theme from '../../../global/styles/theme';
import { ThemeProvider } from 'styled-components/native';

describe('Input Component', () => {
	it('must have bspecific border color when active', () => {
		const { getByTestId } = render(
			<ThemeProvider theme={theme}>
				<Input
					testID="input-email"
					placeholder="email"
					autoCorrect={false}
					keyboardType="email-address"
					active={true}
				/>
			</ThemeProvider>
		);

		const inputTest = getByTestId('input-email');

		expect(inputTest.props.style[0].borderColor).toEqual(
			theme.COLORS.attention
		);
		expect(inputTest.props.style[0].borderWidth).toEqual(3);
	});
});
