import { test, expect } from '../fixture/metamaskExtension';


test('popup page', async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/home.html#onboarding/welcome`);
    await expect(page).toHaveTitle(/MetaMask/);
    // await expect(page.getByTestId("onboarding-welcome" )).toBeVisible({timeout: 10000});
    await expect(page.getByRole('heading', { name: "Let's get started" })).toBeVisible({timeout: 10000});
     
    await page.getByLabel("onboarding-terms-checkbox").click();
    // await expect(box).toBeVisible({timeout: 10000});
    console.log("end of test");



  });

// test('test login success', async ({loginPage, page }) => {

//     await loginPage.LogIn("student", "Password123")
//     await expect(page.getByText('Logged In Successfully Congratulations student. You successfully logged in! Log')).toBeVisible(); 
// });