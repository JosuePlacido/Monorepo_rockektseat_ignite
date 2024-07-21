import { OneSignal } from "react-native-onesignal";

export function tagUserInfo() {
	OneSignal.User.addTags({
		user_email: 'user@example.com',
		user_name: 'user 01'
	});
}


export function tagCartCount(count: number) {
	OneSignal.User.addTags({
		cart_items_count: count
	});
}
