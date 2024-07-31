import React, { useState } from "react";
import {
	View,
	TouchableOpacity,
	Text,
	StatusBar,
	FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
	Extrapolation,
	FadeOut,
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
import { ArrowLeft, ShoppingCart } from "phosphor-react-native";
import { THEME } from "../../styles/theme";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../components/CartItem";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Sound } from "expo-av/build/Audio";

export default function Cart() {
	const { navigate } = useNavigation();
	const { cart, removeProductCart, setShowToast } = useCart();

	async function handleConfirm() {
		const file = require("../../assets/correct.mp3");
		const { sound } = await Sound.createAsync(file, {
			shouldPlay: true
		});
		await sound.setPositionAsync(0);
		sound.playAsync();
		navigate("finish");
		cart.forEach(c => removeProductCart(c.id));
		setShowToast(false);
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent
			/>
			<View style={styles.header}>
				<Text style={styles.title}>Carrinho</Text>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigate("home")}
				>
					<ArrowLeft color={THEME.COLORS.GREY_100} />
				</TouchableOpacity>
			</View>
			<View style={styles.body}>
				<FlatList
					data={cart}
					keyExtractor={item => `${item.id}${item.size}`}
					renderItem={({ item }) => <CartItem item={item} />}
					ListEmptyComponent={() => (
						<View style={styles.emptyView}>
							<View style={styles.emptyTextWrapper}>
								<ShoppingCart
									color={THEME.COLORS.GREY_500}
									weight="fill"
								/>
								<Text style={styles.emptyText}>
									Seu carrinho está vazio
								</Text>
							</View>
							<Button
								title="VER CATÁLOGO"
								onPress={() => navigate("home")}
							/>
						</View>
					)}
				/>
			</View>
			{cart.length > 0 && (
				<View style={styles.footer}>
					<View style={styles.footerHeader}>
						<Text style={styles.footerLabel}>Valor total:</Text>
						<Text style={styles.footerPrice}>
							R${" "}
							{(
								cart.reduce(
									(value, coffee) =>
										value + coffee.price * coffee.count,
									0
								) / 100
							)
								.toFixed(2)
								.replace(".", ",")}
						</Text>
					</View>
					<Button
						title="CONFIRMAR PEDIDO"
						variant="YELLOW"
						onPress={handleConfirm}
					/>
				</View>
			)}
		</SafeAreaView>
	);
}
