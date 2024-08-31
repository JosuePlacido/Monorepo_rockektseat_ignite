import React, { forwardRef, HTMLAttributes, LegacyRef } from 'react';
import { Container, IconBannerVariant } from './styles';

interface IBadgeIconProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: IconBannerVariant;
}

export const BadgeIcon = forwardRef(function BadgeComponent(
	{ children, variant = 'yellow', ...props }: IBadgeIconProps,
	ref: LegacyRef<HTMLSpanElement>
) {
	return (
		<Container ref={ref} variant={variant} {...props}>
			{children}
		</Container>
	);
});
