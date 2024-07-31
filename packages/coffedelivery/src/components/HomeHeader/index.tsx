import { Image, View, Text, Pressable, PressableProps } from "react-native";

import { styles } from "./styles";
import ImgHeader from "../../assets/header.png";
import { MapPin } from "phosphor-react-native";
import { THEME } from "../../styles/theme";
import { CartButton } from "../CartButton";
import { Input } from "../Input";
import { MutableRefObject, useEffect, useState } from "react";
import { Carousel } from "../Carousel";
import Animated, {
	FadeOutUp,
	interpolate,
	interpolateColor,
	SlideInDown,
	SlideInUp,
	SlideOutUp,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

type Props = {
	showHeader: boolean;
};

export function HomeHeader({ showHeader }: Props) {
	const [filter, setFilter] = useState("");

	return (
		<View>
			<View style={styles.container}>
				<View style={[styles.search]}>
					<Text style={styles.title}>
						Encontre o café perfeito para qualquer hora do dia
					</Text>
					<Input
						placeholder="Pesquisar"
						value={filter}
						onChangeText={setFilter}
					/>
					<Image source={ImgHeader} style={styles.img} />
				</View>
			</View>
			<Carousel filter={filter} />
		</View>
	);
}
