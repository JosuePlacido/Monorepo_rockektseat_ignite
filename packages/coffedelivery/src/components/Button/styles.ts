import { StyleSheet } from 'react-native';
import { THEME } from '../../styles/theme';

export const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		minHeight: 46,
		maxHeight: 46,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		color: THEME.COLORS.WHITE,
		fontFamily: 'Roboto_700Bold',
		fontSize: 16
	}
});
