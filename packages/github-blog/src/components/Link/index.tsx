import { ContainerLink } from './styles';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ILinkProps {
	url: string;
	icon: IconDefinition;
	text: string;
	reverse?: boolean;
}

export function AnchorLink({ url, icon, text, reverse = false }: ILinkProps) {
	return (
		<ContainerLink to={url}>
			{reverse && <FontAwesomeIcon icon={icon} />}
			{text}
			{!reverse && <FontAwesomeIcon icon={icon} />}
		</ContainerLink>
	);
}
