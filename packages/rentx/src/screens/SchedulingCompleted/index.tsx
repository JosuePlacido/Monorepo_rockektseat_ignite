import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Footer, Message, Title } from './styles';
import BrandSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { StatusBar, useWindowDimensions } from 'react-native';
import ConfirmButton from '../../components/ConfirmButton';

export default function SchedulingCompleted() {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();

	function handleConfirm() {
		navigation.navigate('Home');
	}

	return (
		<Container>
			<StatusBar
				barStyle="light-content"
				translucent
				backgroundColor="transparent"
			/>
			<BrandSvg width={width} />
			<Content>
				<DoneSvg />
				<Title>Carro alugado!</Title>
				<Message>
					Agora você só precisa ir {'\n'}
					na concessionário da RENTX {'\n'}
					pegar o seu automóvel
				</Message>
			</Content>
			<Footer>
				<ConfirmButton title="OK" onPress={handleConfirm} />
			</Footer>
		</Container>
	);
}
