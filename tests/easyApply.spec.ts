import { test, expect } from '@playwright/test'
import { JobPage } from '../pages/JobPage';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../test.config';

let jobPage: JobPage;
let loginPage: LoginPage;
let testConfig: TestConfig

test.beforeEach(async ({ page }) => {
    testConfig = new TestConfig();
    jobPage = new JobPage(page);
    loginPage = new LoginPage(page);
    await jobPage.navigateTo();
});

test('Navigate to a job with Easy Apply function', async ({ page }) => {
    await jobPage.navigateTo();
    await loginPage.login(testConfig.email, testConfig.password);
    await jobPage.showAllEasyApplyJobCollection();
    await jobPage.clickEasyApplyForSelectedJob();
    try {
        await expect(jobPage.emailLabel).toBeVisible({timeout: 30000});
    }
    catch (error) {
        console.log(`Timeout error: ${error}`);
        throw error;
    }
    await expect(jobPage.emailInput).toBeVisible();
    await expect(jobPage.countryCodeLabel).toBeVisible();
    await expect(jobPage.countryCodeInput).toBeVisible();
    await expect(jobPage.phoneLabel).toBeVisible();
    await expect(jobPage.phoneInput).toBeVisible();
    if(await page.locator('//button[@aria-label="Continue to next step"]/span[text()="Next"]').isVisible()) {
        await page.locator('//button[@aria-label="Continue to next step"]/span[text()="Next"]').click();
    }
    await expect(jobPage.uploadResumeButton).toBeVisible();
})

test('Validate Easy Apply Form', async ({ page }) => {
    await jobPage.navigateTo();
    await loginPage.login(testConfig.email, testConfig.password);
    await jobPage.showAllEasyApplyJobCollection();
    await jobPage.clickEasyApplyForSelectedJob();
    await jobPage.selectEmailOption("Select an option");
    await expect(page.locator('//div[contains(@id, "multipleChoice-error")]//span[@class="artdeco-inline-feedback__message"]')).toHaveText('Please enter a valid answer');
    await jobPage.selectCountryCodeOption("Select an option");
    await expect(page.locator('//div[contains(@id, "phoneNumber-country-error")]//span[@class="artdeco-inline-feedback__message"]')).toHaveText('Please enter a valid answer');
    await jobPage.enterPhoneNumber("");
    await expect(page.locator('//div[contains(@id, "phoneNumber-nationalNumber-error")]//span[@class="artdeco-inline-feedback__message"]')).toHaveText('Enter a valid phone number');
})