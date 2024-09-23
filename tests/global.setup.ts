import { test as setup } from '../fixture/metamaskExtension';
import { MetaMaskPage } from '../page/metamaskPage';
import { STORAGE_STATE } from '../playwright.config';

setup('create new metamask account', async ({ page, extensionId }) => {
  console.log('creating new metamask account...');
  // Initialize the database
  const mm = new MetaMaskPage(page, extensionId);
  await mm.GoTo();
  await mm.CreateAccount()
  await page.context().storageState({ path: STORAGE_STATE });
});

