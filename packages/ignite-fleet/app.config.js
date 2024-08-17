import * as dotenv from "dotenv";

dotenv.config();

module.exports = {
	expo: {
		name: "ignite-fleet",
		slug: "ignite-fleet",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff"
		},
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.josueplacido.ignitefleet",
			config: {
				googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
			},
			infoPlist: {
				UIBackgroundModes: ["location"]
			}
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#ffffff"
			},
			permissions: [
				"ACCESS_FINE_LOCATION",
				"ACCESS_COARSE_LOCATION",
				"ACCESS_BACKGROUND_LOCATION"
			],
			package: "com.josueplacido.ignitefleet",
			config: {
				googleMaps: {
					apiKey: process.env.GOOGLE_MAPS_API_KEY
				}
			}
		},
		web: {
			favicon: "./assets/favicon.png"
		},
		plugins: [
			"expo-font",
			[
				"expo-location",
				{
					isAndroidBackgroundLocationEnabled: true,
					isAndroidForegroundServiceEnabled: true,
					locationAlwaysAndWhenInUsePermission:
						"Allow $(PRODUCT_NAME) to use your location."
				}
			]
		]
	}
};
