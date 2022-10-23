// describe('DuckDuckGo search', () => {
//     it('searches for WebdriverIO', async () => {
//         await browser.url('https://duckduckgo.com/')

//         await $('#search_form_input_homepage').setValue('WebdriverIO')
//         await $('#search_button_homepage').click()

//         const title = await browser.getTitle()
//         console.log('Title is: ' + title)
//         // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"
//     })
// })

describe('Homepage', function () {
    it('should load properly', async function () {
        await browser.url('./');
        await expect(browser).toHaveTitle('Conduit');
        await $('=Sign in').click();
        await expect(browser).toHaveUrl('/login', { containing: true });
        await $('=conduit').click();
        await expect(browser).not.toHaveUrl('/login', { containing: true });
    });
});

const extraLargeTimeOut = 1800000;

describe('Setup infrastructure', () => {
    let originalTimeout;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = extraLargeTimeOut;
    });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    
    it('Update user roles', async () => {
        await loginAsAdministrator();
        await systemUsersPage.open();
        await systemUsersPage.updateRoles();
    }, extraLargeTimeOut);
    
    describe('Approval card screen', () => {

	beforeAll(async () => {
		await loginAsAdministrator();
		await switchFromWebToApp();
		await loginScreen.synchronize(TEST_DATA.LOGIN, TEST_DATA.PASSWORD);
		await navigationMenu.openSection('Approvals');
	});

	beforeEach(async () => {
		if (await Actions.isElementDisplayed(approvalScreen.detailTab)) {
			await approvalScreen.returnToVisaList();
		}
		await approvalsScreen.openPendingTab();
	});

	it('all visa information is displayed on the card, BT-32001, RND-T13153', async () => {
		const visaAuthor = 'Sup';
		await visaUtils.createVisa('Contract', TEST_DATA.NUMBER, TEST_DATA.NUMBER, TEST_DATA.LOGIN,
			TEST_DATA.OBJECTIVE);
		await approvalsScreen.pullToRefresh();
		await approvalsScreen.selectVisaByTitle('Contract', TEST_DATA.NUMBER);
		await Waits.waitForElementVisible(approvalScreen.approveButton);
		expect(await Actions.isElementDisplayed(approvalScreen.approvalObjectiveField)).toEqual(true);
		expect(await approvalScreen.isElementWithAccessibilityIdDisplayed(TEST_DATA.OBJECTIVE)).toEqual(true);
		expect(await Actions.isElementDisplayed(approvalScreen.authorField)).toEqual(true);
		expect(await approvalScreen.isElementWithAccessibilityIdDisplayed(visaAuthor)).toEqual(true);
		expect(await Actions.isElementDisplayed(approvalScreen.dateField)).toEqual(true);
	});
});
