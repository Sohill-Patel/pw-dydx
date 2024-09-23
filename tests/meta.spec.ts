import { test, expect } from "../fixture/metafixture";
import * as metamask from "@synthetixio/synpress/commands/metamask";
import * as playwright  from "@synthetixio/synpress/commands/playwright"
import { HomePage } from "../page/homePage";
import { MetaMaskPage } from "../page/metamaskPage";
import { Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // baseUrl is set in playwright.config.ts
  await page.goto("/");
});

test("connect wallet using default metamask account", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.ConnectToMetaMask();


  console.log("end test");
});