import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		minHeight: 36,
		maxHeight: 36,
		minWidth: 36,
		maxWidth: 36,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative'
	},
	badge: {
		minHeight: 22,
		maxHeight: 22,
		minWidth: 22,
		maxWidth: 22,
		position: 'absolute',
		backgroundColor: THEME.COLORS.PURPLE_DARK,
		borderRadius: 50,
		marginLeft: 30,
		color: THEME.COLORS.WHITE,
		fontFamily: THEME.FONTS.ROBOTO_REGULAR,
		fontSize: 12,
		lineHeight: 12 * 1.3,
		textAlign: 'center',
		textAlignVertical: 'center',
		right: -10,
		top: -10
	}
});
