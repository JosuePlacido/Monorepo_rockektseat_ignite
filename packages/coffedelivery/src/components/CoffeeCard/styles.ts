import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: THEME.COLORS.GREY_700,
		borderWidth: 1,
		borderColor: THEME.COLORS.GREY_800,
		borderRadius: 6,
		borderBottomLeftRadius: 32,
		borderTopRightRadius: 32,
		alignItems: 'flex-start',
		paddingVertical: 12,
		paddingHorizontal: 16,
		paddingLeft: 116,
		margin: 24
	},
	img: {
		height: 96,
		width: 96,
		borderRadius: 64,
		position: 'absolute',
		top: -20,
		left: 10
	},
	title: {
		marginTop: 8,
		color: THEME.COLORS.GREY_200,
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 16,
		lineHeight: 16 * 1.3,
	},
	description: {
		color: THEME.COLORS.GREY_400,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 12,
		lineHeight: 12 * 1.3
	},
	price: {
		color: THEME.COLORS.YELLOW_DARK,
		fontFamily: THEME.FONTS.ROBOTO_BOLD,
		fontSize: 16,
		lineHeight: 16 * 1.3,
		marginTop: 12
	},
	RS: {
		color: THEME.COLORS.YELLOW_DARK,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14
	}
});
