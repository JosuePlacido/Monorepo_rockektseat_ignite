import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
	faBuilding,
	faUserGroup,
	faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { Container } from './Profile.styles';
import { AnchorLink } from '../../../components/Link';
import { useCartForUser } from '../../../hooks/useBlog';
import { memo } from 'react';

function ProfileComponent() {
	const { avatar_url, bio, company, followers, login, name } =
		useCartForUser();
	return (
		<Container>
			<img src={avatar_url} />
			<span>
				<h1>{name}</h1>
				<AnchorLink
					text="GITHUB"
					icon={faArrowUpRightFromSquare}
					url={`https://github.com/${login}`}
				/>
			</span>
			<p>{bio}</p>
			<ul>
				<li>
					<FontAwesomeIcon icon={faGithub} /> {login}
				</li>
				{company && (
					<li>
						<FontAwesomeIcon icon={faBuilding} /> {company}
					</li>
				)}
				<li>
					<FontAwesomeIcon icon={faUserGroup} /> {followers}
					&nbsp;seguidores
				</li>
			</ul>
		</Container>
	);
}

export const Profile = memo(ProfileComponent);
