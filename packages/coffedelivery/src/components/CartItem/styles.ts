import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: THEME.COLORS.GREY_900,
		borderWidth: 1,
		borderColor: THEME.COLORS.GREY_100,
		flexDirection: 'row',
		paddingVertical: 16,
		paddingHorizontal: 32,
		gap: 20
	},
	img: {
		height: 64,
		width: 64,
		borderRadius: 64,
	},
	title: {
		color: THEME.COLORS.GREY_100,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 16,
		lineHeight: 16 * 1.3,
	},
	price: {
		color: THEME.COLORS.GREY_100,
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 16,
		lineHeight: 16 * 1.3
	},
	size: {
		color: THEME.COLORS.GREY_400,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14,
		lineHeight: 14 * 1.3
	},
	Header: {
		flexDirection: "row",
		alignItems: 'baseline',
		justifyContent: "space-between"
	},
	footer: {
		flexDirection: "row",
		gap: 10
	},
	swipeableRemove: {
		paddingHorizontal: 32,
		paddingVertical: 16,
		backgroundColor: THEME.COLORS.RED_LIGHT,
		alignItems: 'flex-start',
		justifyContent: 'center',
		width: '100%'
	},
});
