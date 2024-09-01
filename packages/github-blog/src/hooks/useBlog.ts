import { BlogContext } from '../contexts/blog';
import { useContextSelector } from 'use-context-selector';

export function useCartForUser() {
	const user = useContextSelector(BlogContext, context => {
		return context.user;
	});
	return user;
}

export function useCartForPostList() {
	const post = useContextSelector(BlogContext, context => {
		return context.posts;
	});
	return post;
}

export function useCartForSearchAndCount() {
	const fields = useContextSelector(BlogContext, context => {
		const { posts, user, getPost, ...fields } = context;
		return fields;
	});
	return fields;
}
export function useCartForGetPost() {
	const getPost = useContextSelector(BlogContext, context => {
		return context.getPost;
	});
	return getPost;
}
