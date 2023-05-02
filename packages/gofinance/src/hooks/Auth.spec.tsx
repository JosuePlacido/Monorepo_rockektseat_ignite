import { act, render, renderHook } from "@testing-library/react-native";
import { AuthProvider, useAuth } from "./Auth";
import { startAsync } from "expo-auth-session";

const mockStartAsync = jest.fn();

jest.mock("expo-auth-session", () => {
	return {
		startAsync: () => mockStartAsync()
	};
});

jest.mock("@react-native-async-storage/async-storage", () => {
	return {
		setItem: () => {}
	};
});

describe("auth hook", () => {
	it("should be able to sign in with Google account existing", async () => {
		mockStartAsync.mockReturnValue({
			type: "success",
			params: {
				google_token: "google-token"
			},
			user: {
				id: "any_id",
				email: "juplacido.jnr@gmail.com",
				name: "Josué",
				photo: "picture"
			}
		});

		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						id: `userInfo.id`,
						email: `userInfo.email`,
						name: `userInfo.guiven_name`,
						photo: `userInfo.picture`,
						locale: `userInfo.locale`,
						verified_email: `userInfo.verified_email`
					})
			})
		) as jest.Mock;

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider
		});

		await act(() => result.current.signInWithGoogle());

		expect(result.current.user?.email).toBe("userInfo.email");
	});

	it("user should not connect if cancel authentication with Google", async () => {
		mockStartAsync.mockReturnValue({
			type: "cancel"
		});

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider
		});

		await act(() => result.current.signInWithGoogle());

		expect(result.current.user).toBeUndefined();
	});

	it("should be error with incorrectly Google parameters", async () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider
		});
		try {
			await act(() => result.current.signInWithGoogle());
		} catch {
			expect(result.current.user).toEqual({});
		}
	});
});
