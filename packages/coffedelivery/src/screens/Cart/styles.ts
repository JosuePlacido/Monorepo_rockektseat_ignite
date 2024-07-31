import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: THEME.COLORS.GREY_900
	},
	header: {
		padding: 28,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		position: 'relative',
		borderColor: THEME.COLORS.GREY_700,
		borderBottomWidth: 1
	},
	backButton: {
		position: 'absolute',
		left: 26
	},
	title: {
		color: THEME.COLORS.GREY_200,
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 16,
		lineHeight: 16 * 1.3
	},
	body: {
		flex: 1,
	},
	footer: {
		paddingHorizontal: 32,
		paddingTop: 28,
		paddingBottom: 40,
		backgroundColor: THEME.COLORS.WHITE,
		gap: 20,
		elevation: 10,
		alignItems: 'stretch',
	},
	footerHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
	},
	footerLabel: {
		color: THEME.COLORS.GREY_200,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 16,
		lineHeight: 16 * 1.3
	},
	footerPrice: {
		color: THEME.COLORS.GREY_200,
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 20,
		lineHeight: 20 * 1.3
	},
	emptyView: {
		justifyContent: 'center',
		alignItems: 'stretch',
		padding: 64,
		gap: 32
	},
	emptyText: {
		color: THEME.COLORS.GREY_400,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14,
		lineHeight: 14 * 1.3
	},
	emptyTextWrapper: {
		justifyContent: "center",
		alignItems: "center",
		gap: 12
	}
});
