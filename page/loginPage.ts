import { expect, Page } from "@playwright/test"
import { HomePage } from "./homePage";
import { MetaMaskPage } from "./metamaskPage";

export class LoginPage {
    page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    async GoTo() {
        const homePage = new HomePage(this.page)
        await homePage.GoTo()

        await this.page.getByRole('banner').getByRole('button', { name: 'Connect wallet' }).click();
        await expect(this.page.getByRole('heading', { name: 'Connect your wallet' })).toBeVisible()
    }

    async LogInWithMetaMask(){
        // TODO: Login 
        const mm = new MetaMaskPage(this.page);
        mm.GoTo();
    }
}