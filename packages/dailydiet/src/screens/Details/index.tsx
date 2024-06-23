import { Button } from "@components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { Header } from "@components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Modal, ToastAndroid } from "react-native";
import { useTheme } from "styled-components/native";
import {
	Container,
	Content,
	Text,
	HorizontalView,
	Footer,
	Title,
	Description,
	Label,
	TextTag
} from "./styles";
import { Dialog } from "@components/Modal";
import { useEffect, useState } from "react";
import { getById } from "@storage/snacks/getAll";
import { ISnack } from "@models/snacks";
import { removeSnack } from "@storage/snacks/remove";
import { AppError } from "@utils/AppError";

type IParams = {
	id: string;
};

export function Details() {
	const [modalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState<ISnack>({} as ISnack);
	const { COLORS } = useTheme();
	const navigation = useNavigation();
	const route = useRoute();
	const { id } = route.params as IParams;

	function handleRemove() {
		setModalVisible(true);
	}
	function handleEditSnack() {
		navigation.navigate("form", { id });
	}

	async function handleSave() {
		try {
			await removeSnack(data);

			navigation.navigate("home");
			ToastAndroid.show(
				"Registro excluido com sucesso!",
				ToastAndroid.SHORT
			);
			setModalVisible(false);
		} catch (error) {
			if (error instanceof AppError) {
				Alert.alert("Excluir refeição", error.message);
			} else {
				console.log(error);
				Alert.alert(
					"Excluir refeição",
					"Não foi possível remover essa refeição."
				);
			}
		}
	}

	async function fetchSnack() {
		const snack = await getById(id);
		setData(snack);
	}

	useEffect(() => {
		fetchSnack();
	}, []);

	return (
		<Container success={data.success}>
			<Header title="Refeição" type={data.success ? "GOOD" : "BAD"} />
			<Content>
				<Title>{data.title}</Title>
				<Description>{data.description}</Description>
				<Label>Data e Hora</Label>
				<Text>
					{data.date} as {data.hour}
				</Text>
				<HorizontalView>
					<FontAwesome
						name="circle"
						size={8}
						color={
							data.success ? COLORS.GREEN_DARK : COLORS.RED_DARK
						}
					/>
					<TextTag>
						{data.success ? "Dentro da dieta" : "Fora da dieta"}
					</TextTag>
				</HorizontalView>
				<Footer>
					<Button
						title="Editar refeição"
						icon="EDIT"
						type="DARK"
						onPress={handleEditSnack}
					/>
					<Button
						title="Excluir refeição"
						icon="DEL"
						onPress={handleRemove}
					/>
				</Footer>
			</Content>

			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<Dialog
					title="Deseja realmente excluir o registro de refeição?"
					onCancel={() => setModalVisible(false)}
					onConfirm={handleSave}
				/>
			</Modal>
		</Container>
	);
}
