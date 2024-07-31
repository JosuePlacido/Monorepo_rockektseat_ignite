import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	title: {
		color: THEME.COLORS.GREY_100,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 16,
		lineHeight: 21,
		marginHorizontal: 8
	}
});
