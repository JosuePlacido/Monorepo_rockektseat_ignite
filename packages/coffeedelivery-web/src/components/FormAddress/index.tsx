import { useFormContext } from 'react-hook-form';
import { Input } from '../Input';
import { Container } from './styles';
import { AddressFormData } from '../../pages/Cart';

export function FormAddress() {
	const { register, formState } = useFormContext<AddressFormData>();
	return (
		<Container>
			<span>
				<Input
					id="cep"
					placeholder="CEP"
					error={formState.errors.cep}
					{...register('cep')}
				/>
			</span>
			<span>
				<Input
					placeholder="Rua"
					grow="fill"
					id="street"
					error={formState.errors.street}
					{...register('street')}
				/>
			</span>
			<span>
				<Input
					placeholder="Numero"
					id="number"
					error={formState.errors.number}
					{...register('number')}
				/>
				<Input
					placeholder="Complemento"
					grow="fill"
					id="complement"
					opcional
					error={formState.errors.complement}
					{...register('complement')}
				/>
			</span>
			<span>
				<Input
					placeholder="Bairro"
					id="district"
					error={formState.errors.district}
					{...register('district')}
				/>
				<Input
					placeholder="Cidade"
					grow="fill"
					id="city"
					error={formState.errors.city}
					{...register('city')}
				/>
				<Input
					placeholder="UF"
					grow="auto"
					id="uf"
					error={formState.errors.uf}
					{...register('uf')}
				/>
			</span>
		</Container>
	);
}
