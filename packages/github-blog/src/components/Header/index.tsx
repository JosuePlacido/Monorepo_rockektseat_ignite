import { HeaderContainer, HeaderContent } from './styles';

import logoImg from '../../assets/Logo.png';
import LeftImg from '../../assets/left.png';
import RightImg from '../../assets/right.png';
import { memo } from 'react';

export function HeaderComponent() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={LeftImg} alt="" />
				<img src={logoImg} alt="" />
				<img src={RightImg} alt="" />
			</HeaderContent>
		</HeaderContainer>
	);
}

export const Header = memo(HeaderComponent);
