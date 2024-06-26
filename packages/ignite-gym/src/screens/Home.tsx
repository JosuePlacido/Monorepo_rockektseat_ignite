import { HomeHeader } from "@components/HomeHeader";
import { FlatList, Heading, HStack, VStack, Text, useToast } from "native-base";
import { Group } from "@components/Group";
import { useCallback, useEffect, useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import AppError from "api/src/utils/AppError";
import { ExerciseDTO } from "@dtos/ExercisesDTO";
import { Loading } from "@components/Loading";

export function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const navigation = useNavigation<AppNavigatorRoutesProps>();
	const toast = useToast();

	function handleOpenExerciseDetails(exerciseId: string) {
		navigation.navigate("exercise", { exerciseId });
	}
	const [groupSelected, setGroupSelected] = useState("antebraço");
	const [groups, setGroups] = useState<string[]>([]);

	const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

	async function fetchGroups() {
		try {
			const response = await api.get("/groups");
			setGroups(response.data);
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: "Não foi possível carregar os grupos musculares";

			toast.show({
				title,
				placement: "top",
				bgColor: "red.500"
			});
		}
	}

	async function fecthExercisesByGroup() {
		try {
			setIsLoading(true);
			const response = await api.get(
				`/exercises/bygroup/${groupSelected}`
			);
			setExercises(response.data);
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError
				? error.message
				: "Não foi possível carregar os exercícios";

			toast.show({
				title,
				placement: "top",
				bgColor: "red.500"
			});
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchGroups();
	}, []);

	useFocusEffect(
		useCallback(() => {
			fecthExercisesByGroup();
		}, [groupSelected])
	);

	return (
		<VStack flex={1}>
			<HomeHeader />
			<FlatList
				data={groups}
				keyExtractor={item => item}
				renderItem={({ item }) => (
					<Group
						name={item}
						isActive={
							groupSelected.toLocaleUpperCase() ===
							item.toLocaleUpperCase()
						}
						onPress={() => setGroupSelected(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				_contentContainerStyle={{
					px: 8
				}}
				my={10}
				maxH={10}
				minH={10}
			/>
			{isLoading ? (
				<Loading />
			) : (
				<VStack px={8}>
					<HStack justifyContent="space-between" mb={5}>
						<Heading
							color="gray.200"
							fontSize="md"
							fontFamily="heading"
						>
							Exercícios
						</Heading>

						<Text color="gray.200" fontSize="sm">
							{exercises.length}
						</Text>
					</HStack>

					<FlatList
						data={exercises}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<ExerciseCard
								onPress={() =>
									handleOpenExerciseDetails(item.id)
								}
								data={item}
							/>
						)}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{
							paddingBottom: 20
						}}
					/>
				</VStack>
			)}
		</VStack>
	);
}
