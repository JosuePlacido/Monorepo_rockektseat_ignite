import 'styled-components';
import theme from '.';

declare module 'styled-components/native' {
	type ThemeType = typeof theme

	export interface DefaultTheme extends ThemeType { }
}
