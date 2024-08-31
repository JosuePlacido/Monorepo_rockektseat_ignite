import { forwardRef, InputHTMLAttributes, LegacyRef, useState } from 'react';
import { Container, ErrorMessage } from './styles';
import { FieldError } from 'react-hook-form';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	grow?: 'auto' | 'fill';
	error?: FieldError;
	opcional?: boolean;
}

export const Input = forwardRef(function TextInput(
	{ grow, error, opcional, ...props }: IInputProps,
	ref: LegacyRef<HTMLInputElement>
) {
	const [border, setBorder] = useState(!!props.value);
	function handleBlur(event: React.FocusEvent<HTMLInputElement, Element>) {
		setBorder(event.target.value?.length > 0);
		if (props.onBlur) props.onBlur(event);
	}

	return (
		<Container grow={grow} border={border ? 'yellow-dark' : 'gray-400'}>
			<span>
				<input ref={ref} onBlur={handleBlur} {...props} />
				{opcional && <em>Opcional</em>}
			</span>
			{error && <ErrorMessage>{error.message}</ErrorMessage>}
		</Container>
	);
});
