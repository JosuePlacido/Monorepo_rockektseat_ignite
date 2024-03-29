import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Container, Content, Footer, Message, Title } from './styles';
import BrandSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { StatusBar, useWindowDimensions } from 'react-native';
import ConfirmButton from '../../components/ConfirmButton';

interface Params {
	title: string;
	message: string;
	nextScreenRoute: string;
}

export default function Confirmation() {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();
	const route = useRoute();
	const { title, message, nextScreenRoute } = route.params as Params;
	function handleConfirm() {
		navigation.navigate(nextScreenRoute);
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
				<Title>{title}</Title>
				<Message>{message}</Message>
			</Content>
			<Footer>
				<ConfirmButton title="OK" onPress={handleConfirm} />
			</Footer>
		</Container>
	);
}
