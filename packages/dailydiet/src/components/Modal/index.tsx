import React from "react";
import {
	Container,
	HorizontalView,
	ModalView,
	Title,
	WrapperButton
} from "./styles";
import { useTheme } from "styled-components/native";
import { Button } from "@components/Button";
import { View } from "react-native";

type Props = {
	title: string;
	onCancel: () => void;
	onConfirm: () => void;
};

export function Dialog({ title, onCancel, onConfirm }: Props) {
	return (
		<Container>
			<ModalView>
				<Title>{title}</Title>
				<HorizontalView>
					<WrapperButton>
						<Button title="Cancelar" onPress={onCancel} />
					</WrapperButton>
					<WrapperButton>
						<Button
							title="Sim, excluir"
							type="DARK"
							onPress={onConfirm}
						/>
					</WrapperButton>
				</HorizontalView>
			</ModalView>
		</Container>
	);
}
