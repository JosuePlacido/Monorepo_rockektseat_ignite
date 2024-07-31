import React, { useState } from "react";
import {
	View,
	Text,
	Pressable,
	SectionList,
	ScrollView,
	Dimensions
} from "react-native";
import { styles } from "./styles";
import { Tag } from "../../components/Tag";
import { CoffeeCard } from "../../components/CoffeeCard";
import { HomeHeader } from "../../components/HomeHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { COFFEES } from "../../Data/Coffees";
import Animated, {
	Extrapolation,
	FadeOut,
	FlipInXDown,
	FlipInXUp,
	FlipOutXDown,
	FlipOutXUp,
	interpolate,
	interpolateColor,
	runOnJS,
	SlideInDown,
	SlideInUp,
	SlideOutDown,
	SlideOutUp,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { ArrowRight, MapPin, ShoppingCart } from "phosphor-react-native";
import { CartButton } from "../../components/CartButton";
import { THEME } from "../../styles/theme";
import { useCart } from "../../hooks/useCart";
import { useNavigation } from "@react-navigation/native";

const coffeesSectioned = [
	{
		title: "Tradicional",
		data: COFFEES.filter(c => c.type === "Tradicional")
	},
	{
		title: "Especial",
		data: COFFEES.filter(c => c.type === "Especial")
	},
	{
		title: "Doce",
		data: COFFEES.filter(c => c.type === "Doce")
	}
];
const Footer = Animated.createAnimatedComponent(Pressable);
export default function Home() {
	const { cart, setShowToast, showToast } = useCart();
	const { navigate } = useNavigation();
	const [typeSelected, setTypeSelected] = useState<
		"All" | "Especial" | "Doce" | "Tradicional"
	>("All");

	function handleGoCart() {
		navigate("cart");
		setShowToast(false);
	}

	const [showHeader, setShowHeader] = useState(false);

	const scrolled = useSharedValue(0);

	const navStyle = useAnimatedStyle(() => {
		return {
			borderColor: interpolateColor(
				scrolled.value,
				[0, 1],
				[THEME.COLORS.GREY_100, THEME.COLORS.GREY_800]
			),
			backgroundColor: interpolateColor(
				scrolled.value,
				[0, 1],
				[THEME.COLORS.GREY_100, THEME.COLORS.GREY_900]
			)
		};
	});
	const navTitleStyle = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				scrolled.value,
				[0, 1],
				[THEME.COLORS.WHITE, THEME.COLORS.GREY_200]
			)
		};
	});

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: event => {
			runOnJS(setShowHeader)(event.contentOffset.y > 489);
			scrolled.value = withTiming(event.contentOffset.y <= 242 ? 0 : 1);
		}
	});

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.header, navStyle]}>
				<MapPin weight="fill" color={THEME.COLORS.PURPLE} />
				<Animated.Text style={[styles.local, navTitleStyle]}>
					Sorocaba/SP
				</Animated.Text>
				<CartButton />
			</Animated.View>
			<View style={[styles.hideHeader, { zIndex: showHeader ? 1 : -1 }]}>
				<Text style={styles.titleList}>Nosso cafés</Text>
				<View style={[styles.tags]}>
					<Tag
						title="ESPECIAIS"
						isChecked={typeSelected === "Especial"}
						onPress={() =>
							setTypeSelected(
								typeSelected === "Especial" ? "All" : "Especial"
							)
						}
					/>
					<Tag
						title="TRADICIONAIS"
						isChecked={typeSelected === "Tradicional"}
						onPress={() =>
							setTypeSelected(
								typeSelected === "Tradicional"
									? "All"
									: "Tradicional"
							)
						}
					/>
					<Tag
						title="DOCES"
						isChecked={typeSelected === "Doce"}
						onPress={() =>
							setTypeSelected(
								typeSelected === "Doce" ? "All" : "Doce"
							)
						}
					/>
				</View>
			</View>
			<Animated.ScrollView
				style={styles.body}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
			>
				<HomeHeader showHeader={showHeader} />
				<Animated.Text
					entering={SlideInDown}
					exiting={SlideOutUp}
					style={styles.titleList}
				>
					Nosso cafés
				</Animated.Text>
				<Animated.View
					entering={SlideInDown}
					exiting={SlideOutUp}
					style={[styles.tags]}
				>
					<Tag
						title="ESPECIAIS"
						isChecked={typeSelected === "Especial"}
						onPress={() =>
							setTypeSelected(
								typeSelected === "Especial" ? "All" : "Especial"
							)
						}
					/>
					<Tag
						title="TRADICIONAIS"
						isChecked={typeSelected === "Tradicional"}
						onPress={() =>
							setTypeSelected(
								typeSelected === "Tradicional"
									? "All"
									: "Tradicional"
							)
						}
					/>
					<Tag
						title="DOCES"
						isChecked={typeSelected === "Doce"}
						onPress={() =>
							setTypeSelected(
								typeSelected === "Doce" ? "All" : "Doce"
							)
						}
					/>
				</Animated.View>
				<View style={{ flex: 1, alignItems: "center" }}>
					{coffeesSectioned
						.filter(
							cs =>
								typeSelected === "All" ||
								cs.title === typeSelected
						)
						.map(cs => (
							<View key={cs.title}>
								<Text style={styles.sectionListTitle}>
									{cs.title}
								</Text>
								{cs.data.map(d => (
									<CoffeeCard
										key={d.id}
										item={d}
										onPress={() =>
											navigate("coffee", { id: d.id })
										}
									/>
								))}
							</View>
						))}
				</View>
			</Animated.ScrollView>
			{showToast && cart.length > 0 && (
				<Footer
					entering={FlipInXDown}
					exiting={FlipOutXUp}
					style={styles.toast}
					onPress={handleGoCart}
				>
					<View style={styles.footerIcon}>
						<ShoppingCart
							weight="fill"
							color={THEME.COLORS.WHITE}
						/>
						<Text style={styles.footerBadge}>{cart.length}</Text>
					</View>
					<View
						style={{ width: Dimensions.get("window").width - 194 }}
					>
						<Text style={styles.footerText}>
							{cart[cart.length - 1].count} café{" "}
							<Text style={styles.footerTextBold}>
								{cart[cart.length - 1].title}
							</Text>{" "}
							de{" "}
							<Text style={styles.footerTextBold}>
								{cart[cart.length - 1].size}
							</Text>{" "}
							adicionado ao carrinho
						</Text>
					</View>
					<View style={styles.footerSee}>
						<Text style={styles.footerSeeText}>VER</Text>
						<ArrowRight color={THEME.COLORS.PURPLE} size={16} />
					</View>
				</Footer>
			)}
		</View>
	);
}
