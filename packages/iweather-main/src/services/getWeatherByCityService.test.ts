import { mockWeatherAPIResponse } from "@__tests__/mocks/api/mockWeatherAPIRESPONSE";
import { api } from "./api";
import { getWeatherByCityService } from './getWeatherByCityService';
import { CityProps } from "./getCityByNameService";
import { getStorageCity, saveStorageCity } from "@libs/asyncStorage/cityStorage";

describe('Service: getWeatherByCityService', () => {
	it("should be return weather api data formatted", async () => {
		jest.spyOn(api, "get").mockResolvedValue({ data: mockWeatherAPIResponse })

		const response = await getWeatherByCityService({ latitude: 123, longitude: 456 })

		expect(response).toHaveProperty('today')
	})
	it('shoul be return city storaged', async () => {
		const newCity: CityProps = {
			id: '1',
			name: 'São Paulo',
			latitude: 123,
			longitude: 456
		}

		await saveStorageCity(newCity)

		const response = await getStorageCity()

		expect(response).toEqual(newCity)
	})
})
