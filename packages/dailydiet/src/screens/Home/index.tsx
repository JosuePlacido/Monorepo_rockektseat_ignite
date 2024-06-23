import LogoImg from "@assets/logo.png";
import { Button } from "@components/Button";
import { HeaderItem } from "@components/HeaderItem";
import { Item } from "@components/item";
import { Loading } from "@components/Loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllSnacksSectioned, IDataSnack } from "@storage/snacks/getAll";
import { getStatistics, IStatistics } from "@storage/statistics/getStatistics";
import { ArrowUpRight } from "phosphor-react-native";
import { useCallback, useRef, useState } from "react";
import { Alert, Image } from "react-native";
import { useTheme } from "styled-components/native";
import {
	Container,
	Header,
	Highlight,
	HighlightHeader,
	HighlightHeaderButtton,
	SubtitleHighlight,
	TitleHighlight,
	UserImage,
	Text,
	ListView
} from "./styles";

export function Home() {
	const { COLORS } = useTheme();
	const data = useRef<IDataSnack[]>([]);
	const stats = useRef<IStatistics>();
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation();
	function handleStatistics() {
		navigation.navigate("statistics", { stats: stats.current });
	}
	function handleGoSnack(id: string) {
		navigation.navigate("details", { id });
	}

	async function fetchData() {
		try {
			setIsLoading(true);
			const dataStored = await getAllSnacksSectioned();
			data.current = dataStored;
			stats.current = await getStatistics();
		} catch (error) {
			console.log(error);
			Alert.alert("Turmas", "Não foi possível carregar as turmas");
		} finally {
			setIsLoading(false);
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchData();
		}, [])
	);

	return (
		<Container>
			<Header>
				<Image source={LogoImg} />
				<UserImage
					source={{ uri: "https://github.com/JosuePlacido.png" }}
				/>
			</Header>
			<Highlight isBad={stats.current?.percent! <= stats.current?.limit!}>
				<HighlightHeader>
					<HighlightHeaderButtton onPress={handleStatistics}>
						<ArrowUpRight
							size={32}
							color={
								stats.current?.percent! > stats.current?.limit!
									? COLORS.GREEN_DARK
									: COLORS.RED_DARK
							}
						/>
					</HighlightHeaderButtton>
				</HighlightHeader>
				<TitleHighlight>
					{stats.current?.percent.toFixed(2)} %
				</TitleHighlight>
				<SubtitleHighlight>
					das refeições dentro da dieta
				</SubtitleHighlight>
			</Highlight>
			<Text>Refeições</Text>
			<Button
				title="Nova refeição"
				icon="PLUS"
				type="DARK"
				onPress={() => navigation.navigate("form")}
			/>
			{isLoading ? (
				<Loading />
			) : (
				<ListView
					sections={data.current}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.title}
					renderItem={({ item }) => (
						<Item
							lunch={item}
							onPress={() => handleGoSnack(item.id)}
						/>
					)}
					renderSectionHeader={({ section: { title } }) => (
						<HeaderItem title={title} />
					)}
				/>
			)}
		</Container>
	);
}
