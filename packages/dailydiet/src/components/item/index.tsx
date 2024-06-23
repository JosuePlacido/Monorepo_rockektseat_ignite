import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Container, Hour, Separator, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import { ISnack } from "@models/snacks";

type Props = TouchableOpacityProps & {
	lunch: ISnack;
};

export function Item({ lunch, ...rest }: Props) {
	const { COLORS } = useTheme();

	return (
		<Container {...rest}>
			<Hour>{lunch.hour}</Hour>
			<Separator>|</Separator>
			<Title numberOfLines={1} ellipsizeMode="tail">
				{lunch.title}
			</Title>
			<FontAwesome
				name="circle"
				size={16}
				color={lunch.success ? COLORS.GREEN_MID : COLORS.RED_MID}
			/>
		</Container>
	);
}
