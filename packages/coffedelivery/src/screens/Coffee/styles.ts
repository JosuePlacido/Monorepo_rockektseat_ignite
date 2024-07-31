import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: THEME.COLORS.GREY_100,
		flexDirection: 'column-reverse'
	},
	header: {
		paddingHorizontal: 32,
		paddingTop: 20,
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	body: {
		flex: 1,
		paddingTop: 12,
		paddingHorizontal: 32,
		gap: 20,
		alignItems: 'flex-start',
		overflow: 'visible',
		paddingBottom: 200
	},
	footer: {
		flex: 1,
		backgroundColor: THEME.COLORS.WHITE,
		paddingTop: 42,
		paddingHorizontal: 32,
		paddingBottom: 16,
		gap: 20
	},
	type: {
		backgroundColor: THEME.COLORS.GREY_300,
		borderRadius: 16,
		paddingVertical: 6,
		paddingHorizontal: 12,
		color: THEME.COLORS.WHITE,
		fontFamily: THEME.FONTS.ROBOTO_BOLD,
		fontSize: 10,
		lineHeight: 10 * 1.3,
	},
	priceDisplay: {
		justifyContent: 'space-between',
		alignItems: 'baseline',
		flexDirection: 'row',
		width: '100%'
	},
	title: {
		color: THEME.COLORS.WHITE,
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 24,
		lineHeight: 24 * 1.3
	},
	price: {
		color: THEME.COLORS.YELLOW,
		fontFamily: THEME.FONTS.ROBOTO_BOLD,
		fontSize: 24,
		lineHeight: 24 * 1.3
	},
	description: {
		color: THEME.COLORS.GREY_500,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 16,
		lineHeight: 16 * 1.3
	},
	footerButton: {
		backgroundColor: THEME.COLORS.GREY_700,
		padding: 8,
		gap: 16,
		borderRadius: 6,
		flexDirection: 'row'
	},
	sizeWrapper: {
		gap: 8,
		flexDirection: 'row',
		marginTop: -10
	},
	footerTitle: {
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14,
		lineHeight: 14 * 1.3
	},
});
