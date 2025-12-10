import {Locator, Page} from '@playwright/test';
import { TestConfig } from '../test.config';

export class JobPage {
    private readonly page: Page;
    private readonly config: TestConfig;

    // Locators
    private readonly showAllJobCollectionButton: Locator;
    private readonly easyApplyTab: Locator;
    private readonly easyApplyButton: Locator;

    emailLabel: Locator;
    emailInput: Locator;
    countryCodeLabel: Locator;
    countryCodeInput: Locator;
    phoneLabel: Locator;
    phoneInput: Locator;
    uploadResumeButton:Locator;

    //option[@value="huynhtri0626@gmail.com"]

    constructor(page: Page){
        this.page = page;
        this.config = new TestConfig();
        //this.showAllJobCollectionButton = page.locator('//h2[text()="Explore with job collections"]/ancestor::*[4]//span[text()="Show all"]');
        this.showAllJobCollectionButton = page.locator('//span[text()="Show all"]').first();
        //span[text()="Show all"]
        this.easyApplyTab = page.locator('//a[text()="Easy Apply"]');
        this.easyApplyButton = page.locator('//div[@class="jobs-search__job-details--wrapper"]//span[text()="Easy Apply"]');
        this.emailLabel = page.locator('//label[.//text()="Email address"]');
        this.emailInput = page.locator('//select[contains(@id, "multipleChoice")]')
        this.countryCodeLabel = page.locator('//label[.//text()="Phone country code"]');
        this.countryCodeInput = page.locator('//select[contains(@id, "phoneNumber-country")]');
        this.phoneLabel = page.locator('//label[.//text()="Mobile phone number"]');
        this.phoneInput = page.locator('//input[contains(@id, "phoneNumber-nationalNumber")]');
        this.uploadResumeButton = page.locator('//span[text()="Upload resume"]');
    }

    async navigateTo(){
        await this.page.goto(this.config.appUrl + '/jobs');
    }

    async showAllEasyApplyJobCollection(){
        try {
            await this.showAllJobCollectionButton.click();
            await this.easyApplyTab.click();
        }
        catch (error) {
            console.log(`Exception occurred while clicking 'Show All' for job collections: ${error}`);
            throw error;
        }
    }

    async clickEasyApplyForSelectedJob(){
        try {
            await this.easyApplyButton.first().click();
        }
        catch (error) {
            console.log(`Exception occurred while clicking 'Easy Apply' for the selected job: ${error}`);
            throw error;
        }
    }

    async selectEmailOption(option: string) {
        await this.emailInput.click();
        await this.page.selectOption('//select[contains(@id, "multipleChoice")]',option);
    }

    async selectCountryCodeOption(option: string) {
        await this.emailInput.click();
        await this.page.selectOption('//select[contains(@id, "phoneNumber-country")]',option);
    }

    async enterPhoneNumber(number: string) {
        await this.phoneInput.clear();
        await this.phoneInput.fill(number);
    }
}