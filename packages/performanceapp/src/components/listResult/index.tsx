import React, { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Itemlist } from "../item-list";

interface Props {
	data: {
		id: number;
		name: string;
		likes: number;
	}[];
	follow: () => void;
}

export function ListResult({ data, follow }: Props) {
	const totalLikes = useMemo(() => {
		return data.reduce((likes, user) => likes + user.likes, 0);
	}, [data]);
	return (
		<View>
			<Text> Total de likes: {totalLikes}</Text>
			<FlatList
				data={data}
				keyExtractor={item => String(item.id)}
				renderItem={({ item }) => (
					<Itemlist data={item} follow={follow} />
				)}
			/>
		</View>
	);
}
