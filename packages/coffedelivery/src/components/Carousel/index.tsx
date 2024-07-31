import { View, FlatList, ViewToken } from "react-native";
import { styles } from "./styles";
import { COFFEES } from "../../Data/Coffees";
import { CardHighlight } from "../CardHighlight";
import Animated, {
	FadeIn,
	FadeOut,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { useCallback, useEffect, useRef, useState } from "react";
import { ICoffee } from "../../models/Coffee";

interface ChangeImageProps {
	viewableItems: ViewToken[];
	changed: ViewToken[];
}
type Props = {
	filter: string;
};
export function Carousel({ filter }: Props) {
	const refList = useRef<FlatList>(null);
	const scrollingRef = useRef(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const config = {
		waitForInteraction: true,
		viewAreaCoveragePercentThreshold: 100
	};
	const indexChanged = useCallback((info: ChangeImageProps) => {
		if (info.viewableItems.length > 0) {
			setCurrentIndex(info.viewableItems[0].index!);
			refList.current?.scrollToIndex({
				animated: true,
				index: info.viewableItems[0].index!,
				viewPosition: 0.5
			});
		}
	}, []);

	return (
		<Animated.View entering={FadeIn} exiting={FadeOut}>
			<FlatList
				ref={refList}
				style={styles.list}
				showsHorizontalScrollIndicator={false}
				onScrollBeginDrag={() => (scrollingRef.current = true)}
				onScrollEndDrag={() => (scrollingRef.current = true)}
				viewabilityConfig={config}
				onViewableItemsChanged={indexChanged}
				keyExtractor={coffe => String(coffe.id)}
				horizontal
				contentContainerStyle={styles.contentContainer}
				data={COFFEES.filter(c =>
					c.title.toLowerCase().includes(filter.toLowerCase())
				)}
				renderItem={({ item, index }) => (
					<CardHighlight
						item={item}
						active={index === currentIndex}
					/>
				)}
			/>
		</Animated.View>
	);
}
