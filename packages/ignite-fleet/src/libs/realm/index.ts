import { createRealmContext } from "@realm/react";

import { Historic } from "./schemas/Historic";
import { Coords } from "./schemas/Cords";
const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
	type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: any = {
	flexible: true,
	newRealmFileBehavior: realmAccessBehavior,
	existingRealmFileBehavior: realmAccessBehavior
}

export const { RealmProvider, useRealm, useQuery, useObject } =
	createRealmContext({
		schema: [Historic, Coords],
		schemaVersion: 0
	});
