import { waitFor, screen, act } from "@testing-library/react-native";
import { render } from "@__tests__/utils/customRender";
import { Routes } from ".";
import {
	getStorageCity,
	saveStorageCity
} from "@libs/asyncStorage/cityStorage";
import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIRESPONSE";
import { api } from "@services/api";

describe("Routes", () => {
	it("should be render Search screen when not city selecte", async () => {
		const { debug } = render(<Routes />);
		const title = await waitFor(() =>
			screen.findByText(/^escolha um local/i)
		);

		expect(title).toBeTruthy();
	});
	it("shoul be render Dashboard screen when has city selected", async () => {
		jest.spyOn(api, "get").mockResolvedValue({
			data: mockWeatherAPIResponse
		});
		const city = {
			id: "1",
			name: "São Paulo",
			latitude: 123,
			longitude: 456
		};

		await saveStorageCity(city);

		await act(() => waitFor(() => render(<Routes />)));

		const title = screen.getByText(city.name);

		expect(title).toBeTruthy();
	});
});
