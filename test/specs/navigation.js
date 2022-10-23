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
});
