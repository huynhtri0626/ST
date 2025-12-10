import {Locator, Page} from '@playwright/test';

export class HomePage{
    private readonly page: Page;

    //Locators
    private readonly loginButton: Locator;
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly signinButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.locator('//a[contains(text(), "Login")]')
        this.usernameTextbox = page.locator('#username');
        this.passwordTextbox = page.locator('#password');
        this.signinButton = page.locator('//a[contains(text(), "Login")]')
    }

    
}
////a[contains(text(), "Login")]