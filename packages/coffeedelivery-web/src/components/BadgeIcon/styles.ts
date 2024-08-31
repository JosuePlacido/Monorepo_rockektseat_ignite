import styled, { css } from 'styled-components';

export type IconBannerVariant = 'yellow' | 'purple' | 'dark' | 'yellow-dark';

interface IconBannerProps {
	variant: IconBannerVariant;
}

const iconButtonVariants = {
	yellow: 'yellow',
	purple: 'purple',
	dark: 'gray-700',
	'yellow-dark': 'yellow-dark'
};
export const Container = styled.header<IconBannerProps>`
	display: flex;
	border-radius: 50%;
	color: ${props => props.theme['white']};
	padding: 8px;
	align-items: center;
	justify-content: center;

	${({ theme, variant }) => css`
		background-color: ${theme[iconButtonVariants[variant]]};
	`}
`;
