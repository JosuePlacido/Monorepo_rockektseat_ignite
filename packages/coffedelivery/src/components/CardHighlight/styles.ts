import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: THEME.COLORS.GREY_700,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: THEME.COLORS.GREY_800,
		borderRadius: 6,
		borderBottomLeftRadius: 32,
		borderTopRightRadius: 32,
		paddingHorizontal: 12,
		paddingVertical: 72,
		paddingBottom: 16,
		marginTop: 20
	},
	img: {
		height: 64,
		width: 64,
		borderRadius: 64,
		position: 'absolute',
		top: -15,
	},
	title: {
		marginTop: 8,
		color: THEME.COLORS.GREY_200,
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 14,
		textAlign: 'center',
		lineHeight: 14 * 1.3,
	},
	description: {
		color: THEME.COLORS.GREY_400,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 10,
		textAlign: 'center',
		lineHeight: 10 * 1.3
	},
	price: {
		color: THEME.COLORS.YELLOW_DARK,
		fontFamily: THEME.FONTS.ROBOTO_BOLD,
		fontSize: 24,
		lineHeight: 24 * 1.3,
		marginTop: 12
	},
	RS: {
		color: THEME.COLORS.YELLOW_DARK,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14
	},
	tag: {
		marginBottom: 12,
		textTransform: 'uppercase',
		backgroundColor: THEME.COLORS.PURPLE_LIGHT,
		borderRadius: 50,
		color: THEME.COLORS.PURPLE,
		fontFamily: THEME.FONTS.ROBOTO_BOLD,
		fontSize: 10,
		lineHeight: 10 * 1.3,
	}
});
