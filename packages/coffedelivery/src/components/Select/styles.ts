import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		minHeight: 40,
		maxHeight: 40,
		minWidth: 100,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'transparent'
	},
	title: {
		color: THEME.COLORS.GREY_300,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14
	},
	titleActive: {
		color: THEME.COLORS.PURPLE,
		fontFamily: THEME.FONTS.ROBOTO_BOLD,
		fontSize: 14
	}
});
