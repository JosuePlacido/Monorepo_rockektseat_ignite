import { useEffect, useState } from "react";
import { Alert, BackHandler, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./styles";

import { QUIZ } from "../../data/quiz";
import { historyAdd } from "../../storage/quizHistoryStorage";

import { Loading } from "../../components/Loading";
import { Question } from "../../components/Question";
import { QuizHeader } from "../../components/QuizHeader";
import { ConfirmButton } from "../../components/ConfirmButton";
import { OutlineButton } from "../../components/OutlineButton";
import Animated, {
	Easing,
	Extrapolate,
	interpolate,
	runOnJS,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming
} from "react-native-reanimated";
import { ProgressBar } from "../../components/ProgressBar";
import { THEME } from "../../styles/theme";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { OverlayFeedback } from "../../components/OverlayFeedback";
import { Audio } from "expo-av";

interface Params {
	id: string;
}

const CARD_INCLINATION = 10;
const CARD_SKIP_AREA = -200;
type QuizProps = (typeof QUIZ)[0];

export function Quiz() {
	const [points, setPoints] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [statusReply, setStatusReply] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
	const [alternativeSelected, setAlternativeSelected] = useState<
		null | number
	>(null);
	const shakeValue = useSharedValue(0);
	const scrollY = useSharedValue(0);
	const cardPosition = useSharedValue(0);

	const { navigate } = useNavigation();

	const route = useRoute();
	const { id } = route.params as Params;

	function handleSkipConfirm() {
		Alert.alert("Pular", "Deseja realmente pular a questão?", [
			{ text: "Sim", onPress: () => handleNextQuestion() },
			{ text: "Não", onPress: () => {} }
		]);
	}

	async function handleFinished() {
		await historyAdd({
			id: new Date().getTime().toString(),
			title: quiz.title,
			level: quiz.level,
			points,
			questions: quiz.questions.length
		});

		navigate("finish", {
			points: String(points),
			total: String(quiz.questions.length)
		});
	}

	function handleNextQuestion() {
		if (currentQuestion < quiz.questions.length - 1) {
			setCurrentQuestion(prevState => prevState + 1);
		} else {
			handleFinished();
		}
	}

	async function handleConfirm() {
		if (alternativeSelected === null) {
			return handleSkipConfirm();
		}

		if (quiz.questions[currentQuestion].correct === alternativeSelected) {
			await playSound(true);
			setPoints(prevState => prevState + 1);
			setStatusReply(1);
			handleNextQuestion();
		} else {
			await playSound(false);
			setStatusReply(2);
			handleShake();
		}

		setAlternativeSelected(null);
	}

	function handleStop() {
		Alert.alert("Parar", "Deseja parar agora?", [
			{
				text: "Não",
				style: "cancel"
			},
			{
				text: "Sim",
				style: "destructive",
				onPress: () => navigate("home")
			}
		]);

		return true;
	}

	async function handleShake() {
		await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		shakeValue.value = withSequence(
			withTiming(3, { duration: 400, easing: Easing.bounce }),
			withTiming(0, undefined, finished => {
				"worklet";
				if (finished) {
					runOnJS(handleNextQuestion)();
				}
			})
		);
	}

	async function playSound(isCorrect: boolean) {
		const file = isCorrect
			? require("../../assets/correct.mp3")
			: require("../../assets/wrong.mp3");
		const { sound } = await Audio.Sound.createAsync(file, {
			shouldPlay: true
		});

		await sound.setPositionAsync(0);
		sound.playAsync();
	}

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: event => {
			scrollY.value = event.contentOffset.y;
		}
	});

	const shakeStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: interpolate(
						shakeValue.value,
						[0, 0.5, 1, 1.5, 2, 2.5, 3],
						[0, -15, 0, 15, 0, -15, 0]
					)
				}
			]
		};
	});

	const fixedProgressBarStyle = useAnimatedStyle(() => {
		return {
			position: "absolute",
			paddingTop: 50,
			zIndex: 1,
			backgroundColor: THEME.COLORS.GREY_500,
			left: "-5%",
			width: "110%",
			opacity: interpolate(
				scrollY.value,
				[50, 90],
				[0, 1],
				Extrapolate.CLAMP
			),
			transform: [
				{
					translateY: interpolate(
						scrollY.value,
						[50, 100],
						[-30, 0],
						Extrapolate.CLAMP
					)
				}
			]
		};
	});

	const headerStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollY.value,
				[100, 130],
				[1, 0],
				Extrapolate.CLAMP
			)
		};
	});

	const onPan = Gesture.Pan()
		.activateAfterLongPress(200)
		.onUpdate(event => {
			const moveToLeft = event.translationX < 0;

			if (moveToLeft) {
				cardPosition.value = event.translationX;
			}
		})
		.onEnd(event => {
			if (event.translationX < CARD_SKIP_AREA) {
				runOnJS(handleSkipConfirm)();
			}
			cardPosition.value = withTiming(0);
		});

	const dragStyles = useAnimatedStyle(() => {
		const rotateZ = cardPosition.value / CARD_INCLINATION;
		return {
			transform: [
				{ translateX: cardPosition.value },
				{ rotateZ: `${rotateZ}deg` }
			]
		};
	});

	useEffect(() => {
		const quizSelected = QUIZ.filter(item => item.id === id)[0];
		setQuiz(quizSelected);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (quiz.questions) {
			handleNextQuestion();
		}
	}, []);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			handleStop
		);

		return () => backHandler.remove();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<OverlayFeedback status={statusReply} />
			<Animated.View style={fixedProgressBarStyle}>
				<Text style={styles.title}>{quiz.title}</Text>
				<ProgressBar
					current={currentQuestion + 1}
					total={quiz.questions.length}
				/>
			</Animated.View>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.question}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
			>
				<Animated.View style={[styles.header, headerStyle]}>
					<QuizHeader
						title={quiz.title}
						currentQuestion={currentQuestion + 1}
						totalOfQuestions={quiz.questions.length}
					/>
				</Animated.View>
				<GestureDetector gesture={onPan}>
					<Animated.View style={[shakeStyle, dragStyles]}>
						<Question
							key={quiz.questions[currentQuestion].title}
							question={quiz.questions[currentQuestion]}
							alternativeSelected={alternativeSelected}
							setAlternativeSelected={setAlternativeSelected}
							onUnmount={() => setStatusReply(0)}
						/>
					</Animated.View>
				</GestureDetector>

				<View style={styles.footer}>
					<OutlineButton title="Parar" onPress={handleStop} />
					<ConfirmButton onPress={handleConfirm} />
				</View>
			</Animated.ScrollView>
		</View>
	);
}
