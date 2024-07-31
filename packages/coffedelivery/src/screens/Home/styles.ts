import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	body: { backgroundColor: "white", flex: 1 },
	titleList: {
		color: THEME.COLORS.GREY_300,
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 16,
		lineHeight: 16 * 1.3,
		paddingHorizontal: 32
	},
	tags: {
		zIndex: 1,
		flexDirection: "row",
		paddingVertical: 16,
		paddingHorizontal: 32,
		gap: 8
	},
	sectionListTitle: {
		color: THEME.COLORS.GREY_400,
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 14,
		lineHeight: 14 * 1.3,
		marginLeft: 30
	},
	hideHeader: {
		backgroundColor: THEME.COLORS.WHITE,
		top: 81,
		left: 0,
		right: 0,
		position: "absolute",
		zIndex: 1,
		paddingTop: 16,
	},
	header: {
		paddingHorizontal: 32,
		paddingVertical: 8,
		paddingTop: 36,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		gap: 10
	},
	local: {
		flexGrow: 1,
		color: THEME.COLORS.GREY_900,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14,
		lineHeight: 14 * 1.3
	},
	toast: {
		padding: 32,
		paddingTop: 28,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		gap: 20
	},
	footerIcon: {
		padding: 8,
		borderRadius: 6,
		backgroundColor: THEME.COLORS.GREY_500,
		position: 'relative',
	},
	footerBadge: {
		backgroundColor: THEME.COLORS.PURPLE,
		borderRadius: 20,
		width: 20,
		height: 20,
		color: THEME.COLORS.WHITE,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 12,
		lineHeight: 12 * 1.3,
		position: 'absolute',
		textAlign: 'center',
		textAlignVertical: 'center',
		right: -5,
		top: -5,
	},
	footerText: {
		color: THEME.COLORS.GREY_400,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14,
		lineHeight: 14 * 1.3,
		textAlign: 'left',
	},
	footerTextBold: {
		fontFamily: THEME.FONTS.ROBOTO_BOLD,
	},
	footerSee: {
		flexDirection: "row",
		gap: 5,
		alignItems: "center"
	},
	footerSeeText: {
		color: THEME.COLORS.PURPLE,
		fontFamily: THEME.FONTS.ROBOTO_BOLD,
		fontSize: 12,
		lineHeight: 12 * 1.6,
	},
});
