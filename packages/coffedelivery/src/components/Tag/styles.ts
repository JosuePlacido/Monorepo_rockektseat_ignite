import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 24,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: THEME.COLORS.PURPLE
	},
	title: {
		fontFamily: THEME.FONTS.ROBOTO_BOLD,
		fontSize: 10,
		lineHeight: 13
	}
});
