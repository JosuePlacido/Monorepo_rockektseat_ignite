import * as Tooltip from '@radix-ui/react-tooltip';

import { styled } from '../../styles';

export const Content = styled(Tooltip.Content, {
	padding: '$3 $4',
	borderRadius: 5,
	backgroundColor: '$gray900',
	color: '$gray100',
	fontSize: '$sm',
	lineHeight: '$short',
	fontWeight: '$medium',
	fontFamily: '$code'
});
