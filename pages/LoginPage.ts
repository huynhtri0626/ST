import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    //Locators
    private readonly loginButton: Locator;
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly signinButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // this.loginButton = page.locator('//a[contains(text(), "Sign in")]')
        // this.usernameTextbox = page.locator('#session_key');
        // this.passwordTextbox = page.locator('#session_password');
        // this.signinButton = page.locator('//button[contains(text(), "Sign in")]')

        this.loginButton = page.locator('//a[contains(text(), "Sign in")]')
        this.usernameTextbox = page.locator('#username');
        this.passwordTextbox = page.locator('#password');
        this.signinButton = page.locator('//button[contains(text(), "Sign in")]')
    }

    async login(username: string, password: string) {
        try {
            await this.loginButton.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Sign In' button: ${error}`);
            throw error;
        }

        try {
            await this.usernameTextbox.fill(username);
            await this.passwordTextbox.fill(password);
            await this.signinButton.click();
        }
        catch (error) {
            console.log(`Unable to enter and submit login data: ${error}`);
            throw error;
        }
    }
}