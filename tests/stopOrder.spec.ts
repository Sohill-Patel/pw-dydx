import { test, expect } from '../fixture/metamaskExtension';


test('popup page', async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/popup.html`);
    await expect(page).toHaveTitle(/MetaMask/);
    
    let box = page.getByTestId("onboarding-terms-checkbox");
    await expect(box).toBeVisible({timeout: 10});
    await box.check();
    console.log("end of test");



  });

// test('test login success', async ({loginPage, page }) => {

//     await loginPage.LogIn("student", "Password123")
//     await expect(page.getByText('Logged In Successfully Congratulations student. You successfully logged in! Log')).toBeVisible(); 
// });