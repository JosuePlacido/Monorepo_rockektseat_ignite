import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import Register from ".";
import theme from "../../global/styles/theme";
import { AuthProvider } from "../../hooks/Auth";

const Providers: React.FC = ({ children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

jest.mock("@react-native-async-storage/async-storage", () => {
	return {
		setItem: () => {}
	};
});
jest.mock("../../hooks/Auth.tsx", () => ({
	useAuth: () => ({
		user: {
			id: "123"
		}
	})
}));
jest.mock("@react-navigation/native", () => {
	return {
		useNavigation: jest.fn()
	};
});
describe("register screen", () => {
	it("should be open category modal when user click on the button", async () => {
		const { getByTestId } = render(<Register />, {
			wrapper: Providers
		});
		const categoryModal = getByTestId("modal-category");
		const buttonCategory = getByTestId("button-category");

		fireEvent.press(buttonCategory);

		await waitFor(() => expect(categoryModal.props.visible).toBeTruthy());
	});
});
