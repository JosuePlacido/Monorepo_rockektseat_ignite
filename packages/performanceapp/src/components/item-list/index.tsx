import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import lodash from "lodash";

interface Props {
	data: {
		id: number;
		name: string;
		likes: number;
	};
	follow: () => void;
}

export function ItemComponent({ data, follow }: Props) {
	return (
		<View style={{ margin: 10 }}>
			<Text>
				{data.name} - {data.likes}
			</Text>
			<TouchableOpacity onPress={follow}>
				<Text>Deixar de seguir</Text>
			</TouchableOpacity>
		</View>
	);
}

export const Itemlist = memo(ItemComponent, (prevProps, nextProps) => {
	return lodash.isEqual(prevProps.data, nextProps.data);
});
