import React from 'react';
import { CarImage, CarImageWrapper, Container, ImageIndex, ImagesIndexes } from './styles';

interface Props {
	imagesUrl: string[];
}

export default function ImageSlider({ imagesUrl }: Props) {
	return (
		<Container>
			<ImagesIndexes>
				<ImageIndex active={false} />
				<ImageIndex active={true} />
				<ImageIndex active={false} />
				<ImageIndex active={false} />
			</ImagesIndexes>

			<CarImageWrapper>
				<CarImage
					source={{ uri: imagesUrl[0] }}
					resizeMode="contain"
				/>
			</CarImageWrapper>
		</Container>
	);
}
