import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";
import { useCart } from "../../hooks/useCart";
import { ShoppingCart } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

export function CartButton() {
	const { cart } = useCart();
	const { navigate } = useNavigation();
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigate("finish")}
		>
			{cart.length > 0 && <Text style={styles.badge}>{cart.length}</Text>}
			<ShoppingCart
				weight="fill"
				color={
					cart.length > 0
						? THEME.COLORS.PURPLE_DARK
						: THEME.COLORS.YELLOW_DARK
				}
			/>
		</TouchableOpacity>
	);
}
