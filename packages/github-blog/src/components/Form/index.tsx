import { Container } from './styles';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { memo } from 'react';
import { useCartForSearchAndCount } from '../../hooks/useBlog';

const searchFormSchema = z.object({
	query: z.string()
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;
function SearchFormComponent() {
	const { fetchPosts, postCount } = useCartForSearchAndCount();
	const { register, handleSubmit } = useForm<SearchFormInputs>({
		resolver: zodResolver(searchFormSchema)
	});

	async function handleSearchTransactions(data: SearchFormInputs) {
		await fetchPosts(data.query);
	}
	return (
		<Container onSubmit={handleSubmit(handleSearchTransactions)}>
			<fieldset>
				<label>
					Publicações<small>{postCount} publicações</small>
				</label>
				<input
					type="text"
					placeholder="Buscar contaúdo"
					{...register('query')}
				/>
			</fieldset>
		</Container>
	);
}

export const SearchForm = memo(SearchFormComponent);
