import { Image, View, Text } from "react-native";

import { styles } from "./styles";
import { ICartCoffee, ICoffee } from "../../models/Coffee";
import { InputNumber } from "../InputNumber";
import { ReactNode } from "react";
import { ButtonIcon } from "../ButtonIcon";
import { useCart } from "../../hooks/useCart";
import { Swipeable } from "react-native-gesture-handler";
import { Trash } from "phosphor-react-native";
import { THEME } from "../../styles/theme";

type Props = {
	item: ICartCoffee;
};

export function CartItem({ item }: Props) {
	const { removeProductCart, addProductCart } = useCart();
	function handleChangeCountCart(count: number) {
		const diff = count - item.count;
		addProductCart({
			...item,
			count: diff
		});
	}

	return (
		<Swipeable
			overshootLeft={false}
			leftThreshold={150}
			onSwipeableOpen={() => removeProductCart(item.id)}
			renderRightActions={() => null}
			renderLeftActions={() => (
				<View style={styles.swipeableRemove}>
					<Trash size={32} color={THEME.COLORS.RED_DARK} />
				</View>
			)}
		>
			<View style={styles.container}>
				<Image
					resizeMode="contain"
					style={styles.img}
					source={item.thumbnail}
				/>
				<View style={{ flex: 1 }}>
					<View style={styles.Header}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.price}>
							R$ {(item.price / 100).toFixed(2).replace(".", ",")}
						</Text>
					</View>
					<Text style={styles.size}>{item.size}</Text>
					<View style={styles.footer}>
						<InputNumber
							value={item.count}
							updateValue={handleChangeCountCart}
						/>
						<ButtonIcon
							variant="TRASH"
							onPress={() => removeProductCart(item.id)}
						/>
					</View>
				</View>
			</View>
		</Swipeable>
	);
}
