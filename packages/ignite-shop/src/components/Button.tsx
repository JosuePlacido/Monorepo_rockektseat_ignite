import { HTMLAttributes } from 'react';

import { ButtonContainer } from '@/styles/components/Button';

export function Button({ children, ...props }: HTMLAttributes<HTMLButtonElement>) {
	return <ButtonContainer {...props}>{children}</ButtonContainer>;
}
