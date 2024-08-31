import { useState } from 'react';
import { Minus, Plus } from 'phosphor-react';
import { Container } from './styles';

type Props = {
	value: number;
	updateValue: (value: number) => void;
};
export function InputNumber({ value, updateValue }: Props) {
	const [count, setCount] = useState(value);

	function handleChange(value: number) {
		if (value < 1) return;
		setCount(value);
		updateValue(value);
	}

	return (
		<Container>
			<button onClick={() => handleChange(count - 1)} type="button">
				<Minus />
			</button>
			{count}
			<button onClick={() => handleChange(count + 1)} type="button">
				<Plus />
			</button>
		</Container>
	);
}
