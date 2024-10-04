import * as RadixTooltip from '@radix-ui/react-tooltip';

import { Content } from './styles';

export interface TooltipProps extends RadixTooltip.TooltipProps {
	content: string;
}
export function Tooltip({ content, children, ...props }: TooltipProps) {
	return (
		<RadixTooltip.Root {...props}>
			<RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
			<RadixTooltip.Portal>
				<Content>
					{content}
					<RadixTooltip.Arrow />
				</Content>
			</RadixTooltip.Portal>
		</RadixTooltip.Root>
	);
}
Tooltip.displayName = 'Tooltip';

export function TooltipProvider({ children, ...props }: RadixTooltip.TooltipProviderProps) {
	return (
		<RadixTooltip.Provider delayDuration={200} {...props}>
			{children}
		</RadixTooltip.Provider>
	);
}
