import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: THEME.COLORS.GREY_100,
		width: '100%'
	},
	title: {
		color: THEME.COLORS.WHITE,
		fontFamily: THEME.FONTS.BALOO_BOLD,
		fontSize: 20,
		lineHeight: 20 * 1.3,
	},
	search: {
		gap: 15,
		paddingHorizontal: 4,
		paddingVertical: 20,
		marginHorizontal: 28,
		zIndex: 9999
	},
	img: {
		marginTop: -15,
		marginLeft: 'auto',
	}
});
