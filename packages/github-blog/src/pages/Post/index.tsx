import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnchorLink } from '../../components/Link';
import { Container, Content, Header } from './styles';
import Markdown from 'react-markdown';
import {
	faCalendar,
	faComment,
	faArrowUpRightFromSquare,
	faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useParams } from 'react-router-dom';
import { useCartForGetPost } from '../../hooks/useBlog';
import { useFormatDate } from '../../hooks/usePost';
import { useEffect, useState } from 'react';
import { IPost } from '../../contexts/blog';

export function Post() {
	const { id } = useParams();
	const getPost = useCartForGetPost();
	const [post, setPost] = useState<IPost>();

	useEffect(() => {
		async function loadPost() {
			setPost(await getPost(Number(id)));
		}
		loadPost();
	}, [getPost, id]);

	let publishedDateFormatted = '',
		publishedDateRelativeToNow = '';

	const dates = useFormatDate(post?.created_at || new Date());
	if (post) {
		publishedDateFormatted = dates[0];
		publishedDateRelativeToNow = dates[1];
	}
	if (!post) {
		return null;
	}
	return (
		<Container>
			<Header>
				<span>
					<AnchorLink
						text="VOLTAR"
						icon={faChevronLeft}
						reverse
						url="/"
					/>
					<AnchorLink
						text="GITHUB"
						icon={faArrowUpRightFromSquare}
						url={post.html_url}
					/>
				</span>
				<h1>{post.title}</h1>
				<ul>
					<li>
						<FontAwesomeIcon icon={faGithub} /> {post.user.login}
					</li>
					<li>
						<FontAwesomeIcon icon={faCalendar} />
						<time
							title={publishedDateFormatted}
							dateTime={post.created_at.toISOString()}
						>
							{publishedDateRelativeToNow}
						</time>
					</li>
					<li>
						<FontAwesomeIcon icon={faComment} /> {post.comments}
						&nbsp;comentários
					</li>
				</ul>
			</Header>
			<Content>
				<Markdown>{post.body}</Markdown>
			</Content>
		</Container>
	);
}
