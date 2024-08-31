import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
  	}
	body {
		background-color: ${props => props.theme['gray-100']};
    	color: ${props => props.theme['gray-700']};
  	}
	body, input, textarea, button {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 1rem;
		-webkit-font-smoothing: antialiased;
    	color: ${props => props.theme['gray-700']};
	}
	h1, h3, h4 {
		font-family: 'Baloo 2', sans-serif;
		font-weight: 800;
		-webkit-font-smoothing: antialiased;
	}
	h4, h3 {
		font-weight: 700;
	}
`;
