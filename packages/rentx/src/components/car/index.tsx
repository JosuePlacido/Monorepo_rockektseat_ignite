import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import { Car as ModelCar } from '../../databases/model/Car';
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
interface Props extends RectButtonProps {
	data: ModelCar;
}

export default function Car({ data, ...rest }: Props) {
	const netInfo = useNetInfo();
	return (
		<Container {...rest}>
			<Details>
				<Brand>{data.brand}</Brand>
				<Name>{data.name}</Name>
				<About>
					<Rent>
						<Period>{data.period}</Period>
						<Price>
							{netInfo.isConnected ? 'R$ ' + data.price : '...'}
						</Price>
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
