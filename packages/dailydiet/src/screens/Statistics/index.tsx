import LogoImg from "@assets/logo.png";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { HeaderItem } from "@components/HeaderItem";
import { Item } from "@components/item";
import { ISnack } from "@models/snacks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getById } from "@storage/snacks/getAll";
import { IStatistics } from "@storage/statistics/getStatistics";
import { ArrowLeft } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Image, ScrollView, SectionList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import {
	Container,
	Header,
	HighlightHeader,
	SubtitleHeader,
	HeaderButtton,
	TitleHeader,
	Content,
	Text,
	Highlight,
	TitleHighlight,
	SubtitleHighlight,
	HorizontalView,
	HighlightDefault
} from "./styles";

interface IParams {
	stats: IStatistics;
}

export function Statistics() {
	const { COLORS } = useTheme();
	const route = useRoute();
	const { stats } = route.params as IParams;
	const navigation = useNavigation();
	function handleBack() {
		navigation.navigate("home");
	}
	return (
		<Container isBad={stats.percent <= stats.limit}>
			<Header isBad={stats.percent <= stats.limit}>
				<HighlightHeader>
					<HeaderButtton onPress={handleBack}>
						<ArrowLeft
							size={32}
							color={
								stats.percent > stats.limit
									? COLORS.GREEN_DARK
									: COLORS.RED_DARK
							}
						/>
					</HeaderButtton>
				</HighlightHeader>
				<TitleHeader>{stats.percent.toFixed(2)} %</TitleHeader>
				<SubtitleHeader>das refeições dentro da dieta</SubtitleHeader>
			</Header>
			<Content>
				<Text>Estatísticas</Text>
				<HighlightDefault>
					<TitleHighlight>{stats.biggestSequence}</TitleHighlight>
					<SubtitleHighlight>
						melhor sequência de pratos dentro da dieta
					</SubtitleHighlight>
				</HighlightDefault>
				<HighlightDefault>
					<TitleHighlight>{stats.total}</TitleHighlight>
					<SubtitleHighlight>refeições registradas</SubtitleHighlight>
				</HighlightDefault>
				<HorizontalView>
					<Highlight variant="GOOD">
						<TitleHighlight>{stats.in}</TitleHighlight>
						<SubtitleHighlight>
							refeições dentro da dieta
						</SubtitleHighlight>
					</Highlight>
					<Highlight variant="BAD">
						<TitleHighlight>{stats.out}</TitleHighlight>
						<SubtitleHighlight>
							refeições fora da dieta
						</SubtitleHighlight>
					</Highlight>
				</HorizontalView>
			</Content>
		</Container>
	);
}
