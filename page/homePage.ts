import { Page } from "@playwright/test";

export class HomePage {
    page: Page;
    constructor (page: Page) {
        this.page = page;
    }

    async GoTo() {
        await this.page.goto('.');
    }
}