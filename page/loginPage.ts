import { expect, Page } from "@playwright/test"
import { HomePage } from "./homePage";

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

    async LogIn(username:string, password:string){
        // TODO: Login 
    }
}