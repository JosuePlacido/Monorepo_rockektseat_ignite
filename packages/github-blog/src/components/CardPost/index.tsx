import { useNavigate } from 'react-router-dom';
import { Container } from './styles';
import { memo } from 'react';
import { IPost } from '../../contexts/blog';
import { useFormatDate } from '../../hooks/usePost';

interface ICardProps {
	post: IPost;
}

function CardComponent({ post }: ICardProps) {
	const navigate = useNavigate();
	function handleClick() {
		navigate(`${post.number}`);
	}
	const [publishedDateFormatted, publishedDateRelativeToNow] = useFormatDate(
		post.created_at
	);
	return (
		<Container onClick={handleClick}>
			<header>{post.title}</header>
			<time
				title={publishedDateFormatted}
				dateTime={post.created_at.toISOString()}
			>
				{publishedDateRelativeToNow}
			</time>
			<main>{post.body}</main>
		</Container>
	);
}

export const CardPost = memo(CardComponent);
