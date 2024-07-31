import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COFFEES } from "../../Data/Coffees";
import { ArrowLeft, ShoppingCart } from "phosphor-react-native";
import { THEME } from "../../styles/theme";
import { styles } from "./styles";
import {
	ParamListBase,
	RouteProp,
	useNavigation,
	useRoute
} from "@react-navigation/native";
import { ICoffee } from "../../models/Coffee";
import { Select } from "../../components/Select";
import { InputNumber } from "../../components/InputNumber";
import { Button } from "../../components/Button";
import ImgCoffee from "../../assets/Coffee.png";
import SmokeSVG from "../../assets/Smoke.svg";
import { useCart } from "../../hooks/useCart";
import { Smoke } from "../../components/Smoke";
import {
	BlurMask,
	Canvas,
	DiffRect,
	Line,
	rect,
	rrect,
	vec
} from "@shopify/react-native-skia";
import Animated, {
	Extrapolation,
	interpolate,
	interpolateColor,
	runOnJS,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming
} from "react-native-reanimated";
import { Sound } from "expo-av/build/Audio";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";

interface IRoute extends RouteProp<ParamListBase> {
	params: { id: number };
}

export default function CoffeDetails() {
	const { navigate } = useNavigation();
	const { addProductCart } = useCart();
	const route = useRoute<IRoute>();
	const id = route.params.id;
	const coffee = COFFEES.find(c => c.id === id) || ({} as ICoffee);
	const animationError = useSharedValue(0);
	const animationErrorLabel = useSharedValue(0);
	const errorValues = useDerivedValue(() => {
		return interpolate(animationError.value, [0, 1], [0, 1]);
	});
	const refCount = useRef(1);
	const [size, setSize] = useState<"150ml" | "200ml" | "250ml">();
	const [errorAnimation, setErrorAnimation] = useState(false);
	const [error, setError] = useState(false);

	async function alertError() {
		setErrorAnimation(true);
		setError(true);
		playSound();
		await notificationAsync(NotificationFeedbackType.Error);
		animationError.value = withRepeat(
			withSequence(
				withTiming(1, { duration: 500 }),
				withTiming(0, { duration: 500 })
			),
			1,
			true,
			() => runOnJS(setErrorAnimation)(false)
		);
		animationErrorLabel.value = withTiming(1);
	}
	async function playSound() {
		const file = require("../../assets/correct.mp3");
		const { sound } = await Sound.createAsync(file, {
			shouldPlay: true
		});

		await sound.setPositionAsync(0);
		sound.playAsync();
	}

	function handleAddCart() {
		if (!size) {
			alertError();
			return;
		}
		addProductCart({
			count: refCount.current,
			size,
			...coffee
		});
		navigate("cart");
	}

	const labelSize = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				animationErrorLabel.value,
				[0, 1],
				[THEME.COLORS.GREY_400, THEME.COLORS.RED_DARK]
			)
		};
	});

	useEffect(() => {
		if (size) {
			setError(false);
			animationErrorLabel.value = withTiming(0);
		}
	}, [size]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.footer}>
				<Animated.Text style={[styles.footerTitle, labelSize]}>
					Escolha o tamanho
				</Animated.Text>
				<View style={styles.sizeWrapper}>
					<Select
						title="150ml"
						isChecked={size === "150ml"}
						onPress={() => setSize("150ml")}
						error={error}
					/>
					<Select
						title="200ml"
						isChecked={size === "200ml"}
						onPress={() => setSize("200ml")}
						error={error}
					/>
					<Select
						title="250ml"
						isChecked={size === "250ml"}
						onPress={() => setSize("250ml")}
						error={error}
					/>
				</View>
				<View style={styles.footerButton}>
					<InputNumber
						value={refCount.current}
						updateValue={value => (refCount.current = value)}
					/>
					<Button
						title="ADICIONAR"
						onPress={handleAddCart}
						disabled={size === undefined}
					/>
				</View>
				<Pressable onPress={alertError} style={{ width: "100%" }}>
					<Text>Ver animacao de erro</Text>
				</Pressable>
			</View>
			<View style={styles.body}>
				<Text style={styles.type}>{coffee.type}</Text>
				<View style={styles.priceDisplay}>
					<Text style={styles.title}>{coffee.title}</Text>
					<Text style={styles.price}>
						<Text style={{ fontSize: 14 }}>R$ </Text>
						{(coffee.price / 100).toFixed(2).replace(".", ",")}
					</Text>
				</View>
				<Text style={styles.description}>{coffee.description}</Text>
				<Smoke hasError={errorAnimation} />
				<Canvas
					style={{
						position: "absolute",
						bottom: 0,
						top: 0,
						left: 0,
						right: 0
					}}
				>
					<Line
						p1={vec(0, 0)}
						p2={vec(400, 0)}
						color="red"
						style="stroke"
						strokeWidth={6}
						opacity={errorValues}
					>
						<BlurMask blur={10} style="outer" />
					</Line>
					<Line
						p1={vec(0, 0)}
						p2={vec(0, 445)}
						color="red"
						style="stroke"
						strokeWidth={6}
						opacity={errorValues}
					>
						<BlurMask blur={10} style="outer" />
					</Line>
					<Line
						p1={vec(395, 0)}
						p2={vec(395, 445)}
						color="red"
						style="stroke"
						strokeWidth={6}
						opacity={errorValues}
					>
						<BlurMask blur={10} style="outer" />
					</Line>
					<Line
						p1={vec(0, 445)}
						p2={vec(400, 445)}
						color="red"
						style="stroke"
						strokeWidth={6}
						opacity={errorValues}
					>
						<BlurMask blur={10} style="outer" />
					</Line>
				</Canvas>
			</View>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigate("home")}>
					<ArrowLeft color={THEME.COLORS.WHITE} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigate("cart")}>
					<ShoppingCart weight="fill" color={THEME.COLORS.WHITE} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
