import {
	HStack,
	Text,
	IconButton,
	CloseIcon,
	Icon,
	Pressable
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { OSNotification } from "react-native-onesignal";
import { Linking } from "react-native";
//import * as Linking from "expo-linking";

type Props = {
	data: OSNotification;
	onClose: () => void;
};
export function Notification({ data, onClose }: Props) {
	function handlePressNotification() {
		if (data.launchURL) {
			Linking.openURL(data.launchURL);
			onClose();
		}
	}

	return (
		<Pressable
			w="full"
			p={4}
			pt={12}
			bgColor="gray.200"
			position="absolute"
			top={0}
			onPress={handlePressNotification}
		>
			<HStack justifyContent="space-between" alignItems="center">
				<Icon
					as={Ionicons}
					name="notifications-outline"
					size={5}
					color="black"
					mr={2}
				/>

				<Text fontSize="md" color="black" flex={1}>
					{data.title}
				</Text>

				<IconButton
					variant="unstyled"
					_focus={{ borderWidth: 0 }}
					icon={<CloseIcon size="3" />}
					_icon={{ color: "coolGray.600" }}
					color="black"
					onPress={onClose}
				/>
			</HStack>
		</Pressable>
	);
}
