import { Container, Content } from './styles';
import { SearchForm } from '../../components/Form';
import { CardPost } from '../../components/CardPost';
import { Profile } from './components/Profile';
import { useCartForPostList } from '../../hooks/useBlog';

export function Home() {
	const posts = useCartForPostList();
	return (
		<Container>
			<Profile />
			<SearchForm />
			<Content>
				{posts.map(post => (
					<CardPost key={post.id} post={post} />
				))}
			</Content>
		</Container>
	);
}
