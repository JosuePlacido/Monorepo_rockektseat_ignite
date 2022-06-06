import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import {
	About,
	Brand,
	CarImage,
	Container,
	Details,
	Name,
	Period,
	Price,
	Rent,
	Type
} from './styles';
export interface CarData {
	brand: string;
	name: string;
	rent: {
		period: string;
		price: number;
	}
	thumbnail: string;
}
interface Props extends RectButtonProps {
	data: CarData;
}

export default function Car({ data, ...rest }: Props) {

	return (
		<Container {...rest}>
			<Details>
				<Brand>{data.brand}</Brand>
				<Name>{data.name}</Name>
				<About>
					<Rent>
						<Period>{data.rent.period}</Period>
						<Price>{data.rent.price.toLocaleString('pt-BR', {
							style: 'currency', currency: 'BRL'
						})}</Price>
					</Rent>
					<Type>
						<GasolineSvg />
					</Type>
				</About>
			</Details>

			<CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
		</Container>
	);
}