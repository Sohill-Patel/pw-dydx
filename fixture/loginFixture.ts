import { test as base } from "./metamaskExtension";
import { LoginPage } from "../page/loginPage";

type LoginPageFixture = {
  loginPage: LoginPage,
}


export const test = base.extend<LoginPageFixture>({
  loginPage: async ({ page }, use) => {
    // navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.GoTo();
    await use(new LoginPage(page));
  },



});
export { expect } from '@playwright/test';
