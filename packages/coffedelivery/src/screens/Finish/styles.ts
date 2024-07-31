import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		padding: 64
	},
	title: {
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 24,
		lineHeight: 24 * 1.3,
		color: THEME.COLORS.YELLOW_DARK,
		textAlign: 'center',
		marginTop: 64,
		marginBottom: 16,
	},
	message: {
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14,
		lineHeight: 14 * 1.3,
		color: THEME.COLORS.GREY_200,
		textAlign: 'center',
		marginBottom: 64
	}
});
