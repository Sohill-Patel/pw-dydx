import { test, expect } from '../fixture/metamaskExtension';
import { HomePage } from '../page/homePage';
import { MetaMaskPage } from '../page/metamaskPage';


test('test meta mask account', async ({ page, extensionId}) => {
  const mm = new MetaMaskPage(page, extensionId);
  await mm.GoTo();
  await mm.CreateAccount();

  const homePage = new HomePage(page);
  await homePage.GoTo()
  await homePage.ConnectToMetaMask();
  console.log("setup complete")

});


test('popup page', async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/home.html#onboarding/welcome`);
    await expect(page).toHaveTitle(/MetaMask/);
    // await expect(page.getByTestId("onboarding-welcome" )).toBeVisible({timeout: 10000});
    await expect(page.getByRole('heading', { name: "Let's get started" })).toBeVisible({timeout: 10000});
    try 
    {
      await page.locator("id=onboarding__terms-checkbox").setChecked(true);
    }
    catch (e) {
      // checkbox=True but playwright's assertion fails
      // so assert checkbox is checked
      await expect(page.locator("data-testid=onboarding-create-wallet")).toBeEnabled();
    }

    await page.locator("data-testid=onboarding-create-wallet").click();
    await page.waitForURL(`chrome-extension://${extensionId}/home.html#onboarding/metametrics`);

    await page.locator("data-testid=metametrics-i-agree").click();
    await page.waitForURL(`chrome-extension://${extensionId}/home.html#onboarding/create-password`);

    await page.locator("data-testid=create-password-new").fill("password");
    await page.locator("data-testid=create-password-confirm").fill("password");

    try 
    {
      await page.locator("data-testid=create-password-terms").setChecked(true);
    }
    catch (e) {
      // checkbox=True but playwright's assertion fails
      // so assert checkbox is checked
      await expect(page.locator("data-testid=create-password-wallet")).toBeEnabled();
    }

    page.locator("data-testid=create-password-wallet").click();
    await page.waitForURL(`chrome-extension://${extensionId}/home.html#onboarding/secure-your-wallet`);

    // Start waiting for popup before clicking. Note no await.
    await page.locator("data-testid=secure-wallet-later").click();
    try 
    {
      await page.locator("data-testid=skip-srp-backup-popover-checkbox").setChecked(true);
    }
    catch (e) {
      // checkbox=True but playwright's assertion fails
      // so assert checkbox is checked
      await expect(page.locator("data-testid=skip-srp-backup")).toBeEnabled();
    }
    await page.locator("data-testid=skip-srp-backup").click();
    await page.waitForURL(`chrome-extension://${extensionId}/home.html#onboarding/completion`);

    await page.locator("data-testid=onboarding-complete-done").click();
    await page.waitForURL(`chrome-extension://${extensionId}/home.html#onboarding/pin-extension`);
    
    await page.locator("data-testid=pin-extension-next").click();
    await expect(page.locator("data-testid=pin-extension-done")).toBeVisible();
    await page.locator("data-testid=pin-extension-done").click();
    await page.waitForURL(`chrome-extension://${extensionId}/home.html#`); 

    

    console.log("end of test");



  });

