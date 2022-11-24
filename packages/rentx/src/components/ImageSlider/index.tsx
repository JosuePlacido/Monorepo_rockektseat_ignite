import React, { useRef, useState } from 'react';
import { ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Bullet from '../Bullet';
import { CarImage, CarImageWrapper, Container, ImagesIndexes } from './styles';

interface Props {
	imagesUrl: {
		id: string;
		photo: string;
	}[];
}

interface ChangeImageProps {
	viewableItems: ViewToken[];
	changed: ViewToken[];
}

export default function ImageSlider({ imagesUrl }: Props) {
	const [indexView, setIndexView] = useState(0);
	const indexChanged = useRef((info: ChangeImageProps) => {
		setIndexView(info.viewableItems[0].index!);
	});

	return (
		<Container>
			<ImagesIndexes>
				{imagesUrl.map((item, index) => (
					<Bullet key={item.id} active={index === indexView} />
				))}
			</ImagesIndexes>

			<FlatList
				data={imagesUrl}
				keyExtractor={item => item.id}
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				onViewableItemsChanged={indexChanged.current}
				renderItem={({ item }) => (
					<CarImageWrapper>
						<CarImage
							source={{ uri: item.photo }}
							resizeMode="contain"
						/>
					</CarImageWrapper>
				)}
			/>
		</Container>
	);
}
