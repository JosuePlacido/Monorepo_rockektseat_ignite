import LogoImg from "@assets/logo.png";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Header } from "@components/Header";
import { HeaderItem } from "@components/HeaderItem";
import { Input } from "@components/Input";
import { Item } from "@components/item";
import { Loading } from "@components/Loading";
import { ToggleButton } from "@components/ToggleButton";
import { ISnack } from "@models/snacks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createEditSnack } from "@storage/snacks/createEdit";
import { getById } from "@storage/snacks/getAll";
import { AppError } from "@utils/AppError";
import { ArrowLeft } from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
	Alert,
	Image,
	ScrollView,
	SectionList,
	ToastAndroid,
	View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import {
	Container,
	Content,
	Text,
	HorizontalView,
	ViewAux,
	Footer
} from "./styles";

type IForm = {
	id: string;
	title: string;
	description: string;
	success?: boolean;
	date: string;
	hour: string;
};

const initialValue: IForm = {
	id: "",
	title: "",
	description: "",
	date: "",
	hour: ""
};

type IParams = {
	id?: string;
};

export function Form() {
	const navigation = useNavigation();
	const [form, setForm] = useState<IForm>(initialValue);
	const [isLoading, setIsLoading] = useState(false);
	const route = useRoute();
	const params = route.params as IParams;

	function validation(): boolean {
		const [hour, minute] = form.hour.split(":");
		const [day, month, year] = form.date.split("/");
		let valid = true;
		if (form.success === undefined) {
			ToastAndroid.show(
				"Informe se a dieta está dentro ou fora da dieta",
				ToastAndroid.SHORT
			);
			valid = false;
		}
		if (parseInt(hour) >= 24 || parseInt(minute) >= 60) {
			ToastAndroid.show("Hora inválida", ToastAndroid.SHORT);
			valid = false;
		}
		if (isNaN(Date.parse(`${year}-${month}-${day}`))) {
			ToastAndroid.show("Data inválida", ToastAndroid.SHORT);
			valid = false;
		}
		return valid;
	}

	async function handleConfirm() {
		if (validation()) {
			try {
				setIsLoading(false);
				await createEditSnack(form as ISnack);
				setForm(initialValue);
				navigation.navigate("message", { success: form.success! });
			} catch (error) {
				if (error instanceof AppError) {
					Alert.alert("Nova refeição", error.message);
				} else {
					console.log(error);
					Alert.alert("Nova refeição", "Não foi possível adicionar.");
				}
			} finally {
				setIsLoading(false);
			}
		}
	}

	function handleFormatData(value: string, field: keyof IForm) {
		const onlyNumbers = value.replace(/\D/g, "");
		if (field === "date") {
			const newDate =
				onlyNumbers.length > 6
					? onlyNumbers
							.slice(-8)
							.replace(/^(\d{2})(\d{2})(?=\d)/g, "$1/$2/")
					: onlyNumbers.slice(-8).replace(/(\d{2})(?=\d)/g, "$1/");
			setForm({ ...form, date: newDate });
		}
		if (field === "hour") {
			const newHour = onlyNumbers
				.slice(-4)
				.replace(/(\d{2})(?=\d)/g, "$1:");
			setForm({ ...form, hour: newHour });
		}
	}

	async function fetchSnack() {
		if (params && params.id) {
			const snack = await getById(params.id);
			setForm(snack);
		}
	}

	useEffect(() => {
		fetchSnack();
	}, []);
	return (
		<Container>
			<Header
				title={
					params && params.id ? "Editar refeição" : "Nova refeição"
				}
			/>
			<Content>
				<Input
					label="Nome"
					value={form.title}
					onChangeText={e => setForm({ ...form, title: e })}
				/>
				<Input
					label="Descrição"
					value={form.description}
					onChangeText={e => setForm({ ...form, description: e })}
					numberOfLines={4}
				/>
				<HorizontalView>
					<ViewAux>
						<Input
							label="Data"
							keyboardType="number-pad"
							value={form.date}
							onChangeText={e => handleFormatData(e, "date")}
						/>
					</ViewAux>
					<ViewAux>
						<Input
							label="Hora"
							keyboardType="number-pad"
							value={form.hour}
							onChangeText={e => handleFormatData(e, "hour")}
						/>
					</ViewAux>
				</HorizontalView>
				<Text>Está dentro da dieta?</Text>
				<HorizontalView>
					<ToggleButton
						type="YES"
						checked={form.success === true}
						onPress={() => setForm({ ...form, success: true })}
					/>
					<ToggleButton
						type="NO"
						checked={form.success === false}
						onPress={() => setForm({ ...form, success: false })}
					/>
				</HorizontalView>
				{isLoading && <Loading />}
				<Footer>
					<Button
						title="Cadastrar refeição"
						type="DARK"
						onPress={handleConfirm}
					/>
				</Footer>
			</Content>
		</Container>
	);
}
