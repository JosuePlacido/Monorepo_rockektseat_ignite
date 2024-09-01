import { ReactNode, useCallback, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

interface IUser {
	id: 68264396;
	login: string;
	avatar_url: string;
	bio: string;
	name: string;
	company: string;
	followers: number;
}

export interface IPost {
	id: number;
	number: number;
	comments: number;
	user: {
		login: string;
	};
	title: string;
	created_at: Date;
	html_url: string;
	body: string;
}
interface IStatePost {
	total_count: number;
	items: IPost[];
}
export interface IBlogContextType {
	user: IUser;
	posts: IPost[];
	postCount: number;
	fetchPosts: (q?: string) => Promise<void>;
	getPost: (id: number) => Promise<IPost>;
}

interface BlogProviderProps {
	children: ReactNode;
}

export const BlogContext = createContext({} as IBlogContextType);

export function BlogProvider({ children }: BlogProviderProps) {
	const [user, setUser] = useState<IUser>({} as IUser);
	const [post, setPost] = useState<IStatePost>({
		items: [],
		total_count: 0
	});

	const fetchUser = useCallback(async () => {
		const response = await api.get('users/JosuePlacido');
		setUser(response.data);
	}, []);

	const fetchPosts = useCallback(async (q: string = '') => {
		const { data } = await api.get(
			`search/issues?q=${q} repo:rocketseat-education/reactjs-github-blog-challenge`
		);
		setPost({
			total_count: data.total_count,
			items: data.items.map((i: IPost) => {
				i.created_at = new Date(i.created_at);
				return i;
			})
		});
	}, []);

	const getPost = useCallback(async (id: number) => {
		const { data } = await api.get(
			`repos/rocketseat-education/reactjs-github-blog-challenge/issues/${id}`
		);
		return { ...data, created_at: new Date(data.created_at) } as IPost;
	}, []);

	useEffect(() => {
		fetchUser();
		fetchPosts();
	}, [fetchUser, fetchPosts]);

	return (
		<BlogContext.Provider
			value={{
				user,
				posts: post.items,
				postCount: post.total_count,
				fetchPosts,
				getPost
			}}
		>
			{children}
		</BlogContext.Provider>
	);
}
