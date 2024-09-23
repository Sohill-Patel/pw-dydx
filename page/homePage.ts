import * as playwright  from "@synthetixio/synpress/commands/playwright"
import { Page } from "@playwright/test";
import { expect } from "../fixture/metafixture";


export class HomePage {
    page: Page;
    constructor (page: Page) {
        this.page = page;
    }

    async GoTo() {
        await this.page.goto('.');
    }
    
    async ConnectToMetaMask(){
        await this.page.getByRole('banner').getByRole('button', { name: 'Connect wallet' }).click();
        await this.page.getByRole('button', { name: 'MetaMask' }).click();
        
        // metamask notification
        const notificationPage: Page = await playwright.switchToMetamaskNotification(); 
        await notificationPage.getByRole('button', { name: 'Next' }).click({timeout: 5000});
        await expect(notificationPage.getByRole('heading', { name: 'Permissions' })).toBeVisible()
        await notificationPage.getByRole('button', { name: 'Confirm' }).click({timeout: 5000});

        // Back to dydx popup
        await expect(this.page.getByRole('heading', { name: 'Sign message' })).toBeVisible()
        await this.page.getByRole('button', { name: 'Send request' }).click({timeout: 5000});


        const confirmNotificationPage: Page = await playwright.switchToMetamaskNotification(); 
        await expect(confirmNotificationPage.getByRole('heading', { name: 'Signature request' })).toBeVisible({timeout: 5000});
        await confirmNotificationPage.getByRole('button', { name: 'Confirm' }).click({timeout: 5000});


        // clear notification banners
        await this.page.locator('[aria-haspopup=dialog]').getByRole('button').click();
        await this.page.getByRole('button', { name: 'Clear All' }).click();
        await this.page.goto("/");
    }
}