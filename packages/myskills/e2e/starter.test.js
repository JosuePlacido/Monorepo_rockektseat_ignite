describe("Home screen", () => {
	beforeAll(async () => {
		await device.launchApp();
	});

	beforeEach(async () => {
		await device.reloadReactNative();
	});

	it("should have welcome screen", async () => {
		await expect(element(by.id("wellcome"))).toBeVisible();
	});

	it("check register a new skill", async () => {
		const inputNewSkill = element(by.id("input-new"));
		const buttonAdd = element(by.id("button-add"));
		const listSkills = element(by.id("flatlist-skills"));

		await inputNewSkill.tap();
		await inputNewSkill.typeText("React Native");
		await buttonAdd.tap();
		//await listSkills.tap();

		expect(element(by.id("flatlist-skills"))).toBeVisible();
	});
});
