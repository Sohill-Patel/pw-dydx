import { test as base, chromium, type BrowserContext } from "@playwright/test";
import { initialSetup } from "@synthetixio/synpress/commands/metamask";
import { setExpectInstance } from "@synthetixio/synpress/commands/playwright";
import { resetState } from "@synthetixio/synpress/commands/synpress";
import { prepareMetamask } from "@synthetixio/synpress/helpers";
// import dotenv from 'dotenv'


// dotenv.config();

export const test = base.extend<{
  context: BrowserContext;
  // extensionId: String;
}>({
  context: async ({}, use) => {
    // required for synpress as it shares same expect instance as playwright
    await setExpectInstance(expect);

    // download metamask
    const metamaskPath = await prepareMetamask(
      process.env.METAMASK_VERSION || "12.2.4"
    );

    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      "--remote-debugging-port=9222",
    ];

    if (process.env.CI) {
      browserArgs.push("--disable-gpu");
    }

    if (process.env.HEADLESS_MODE) {
      browserArgs.push("--headless=new");
    }

    // launch browser
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: browserArgs,
    });

    // wait for metamask
    await context.pages()[0].waitForTimeout(3000);

    // setup metamask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey:
        "test test test test test test test test test test test junk",
      network: "sepolia",
      // network: "optimism",
      password: "Tester@1234",
      enableAdvancedSettings: true,

    });

    await use(context);

    await context.close();

    await resetState();
  },
  // extensionId: async ({ context }, use) => {
  //   /*
  //   // for manifest v2:
  //   let [background] = context.backgroundPages()
  //   if (!background)
  //     background = await context.waitForEvent('backgroundpage')
  //   */

  //   // for manifest v3:
  //   let [background] = context.serviceWorkers();
  //   if (!background)
  //     background = await context.waitForEvent('serviceworker');

  //   const extensionId = background.url().split('/')[2];
  //   await use(extensionId);
  // },
});

export const expect = test.expect;