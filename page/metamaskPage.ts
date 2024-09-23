import { expect, Page } from "@playwright/test"


export class MetaMaskPage {
    page: Page;
    extension_id: String | any;

    constructor (page: Page, extension_id: String) {
        this.page = page;
        this.extension_id=extension_id;
    }

    async GoTo() {
        await this.page.goto(`chrome-extension://${this.extension_id}/home.html#onboarding/welcome`);
        await expect(this.page).toHaveTitle(/MetaMask/);
    }

    async switchToMetamaskNotification(metamaskExtensionId: String) {     
      const browserContext = this.page.context()
      const pages = browserContext.pages()

      for (const page of pages) {
        if (
          page
            .url()
            .includes(
              `chrome-extension://${metamaskExtensionId}/notification.html`,
            )
        ) {
          await page.bringToFront();          
          return page;
        }
      }
      throw new Error("metamask notification page not found");
    }

    async CreateAccount(){
        await expect(this.page.getByRole('heading', { name: "Let's get started" })).toBeVisible({timeout: 10000});
    try 
    {
      await this.page.locator("id=onboarding__terms-checkbox").setChecked(true);
    }
    catch (e) {
      // checkbox=True but playwright's assertion fails
      // so assert checkbox is checked
      await expect(this.page.locator("data-testid=onboarding-create-wallet")).toBeEnabled();
    }

    await this.page.locator("data-testid=onboarding-create-wallet").click();
    await this.page.waitForURL(`chrome-extension://${this.extension_id}/home.html#onboarding/metametrics`);

    await this.page.locator("data-testid=metametrics-i-agree").click();
    await this.page.waitForURL(`chrome-extension://${this.extension_id}/home.html#onboarding/create-password`);

    await this.page.locator("data-testid=create-password-new").fill("password");
    await this.page.locator("data-testid=create-password-confirm").fill("password");

    try 
    {
      await this.page.locator("data-testid=create-password-terms").setChecked(true);
    }
    catch (e) {
      // checkbox=True but playwright's assertion fails
      // so assert checkbox is checked
      await expect(this.page.locator("data-testid=create-password-wallet")).toBeEnabled();
    }

    await this.page.locator("data-testid=create-password-wallet").click();
    await this.page.waitForURL(`chrome-extension://${this.extension_id}/home.html#onboarding/secure-your-wallet`);

    // Start waiting for popup before clicking. Note no await.
    await this.page.locator("data-testid=secure-wallet-later").click();
    try 
    {
      await this.page.locator("data-testid=skip-srp-backup-popover-checkbox").setChecked(true);
    }
    catch (e) {
      // checkbox=True but playwright's assertion fails
      // so assert checkbox is checked
      await expect(this.page.locator("data-testid=skip-srp-backup")).toBeEnabled();
    }
    await this.page.locator("data-testid=skip-srp-backup").click();
    await this.page.waitForURL(`chrome-extension://${this.extension_id}/home.html#onboarding/completion`);

    await this.page.locator("data-testid=onboarding-complete-done").click();
    await this.page.waitForURL(`chrome-extension://${this.extension_id}/home.html#onboarding/pin-extension`);
    
    await this.page.locator("data-testid=pin-extension-next").click();
    await expect(this.page.locator("data-testid=pin-extension-done")).toBeVisible();
    await this.page.locator("data-testid=pin-extension-done").click();
    await this.page.waitForURL(`chrome-extension://${this.extension_id}/home.html#`); 
    }
}