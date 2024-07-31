import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		backgroundColor: THEME.COLORS.GREY_200,
		padding: 12,
		borderRadius: 6,
		gap: 10,
	},
	input: {
		flex: 1,
		color: THEME.COLORS.GREY_700,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 14,
		lineHeight: 18,
	}
});
