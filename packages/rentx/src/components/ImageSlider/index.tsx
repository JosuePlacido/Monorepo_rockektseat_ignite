import React, { useRef, useState } from 'react';
import { ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
	CarImage,
	CarImageWrapper,
	Container,
	ImageIndex,
	ImagesIndexes
} from './styles';

interface Props {
	imagesUrl: string[];
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
				{imagesUrl.map((_, index) => (
					<ImageIndex key={index} active={index === indexView} />
				))}
			</ImagesIndexes>

			<FlatList
				data={imagesUrl}
				keyExtractor={key => key}
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				onViewableItemsChanged={indexChanged.current}
				renderItem={item => (
					<CarImageWrapper>
						<CarImage
							source={{ uri: item.item }}
							resizeMode="contain"
						/>
					</CarImageWrapper>
				)}
			/>
		</Container>
	);
}
