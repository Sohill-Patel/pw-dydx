import { Locator, Page } from "@playwright/test";
import { EXPIRY_TYPE, EXPIRY_UNIT_TYPE } from "../types/expiry";


export class TradePage {
    page: Page;
    MID_BTN: Locator;
    TIF: Locator;
    LIMIT_PRICE: Locator;
    SIZE: Locator;
    TIME: Locator;
    TIME_TYPE: Locator;
    STOP_TYPE: Locator;

    constructor (page:Page){
        this.page=page;

        this.MID_BTN = this.page.getByRole('button', { name: 'Mid' });
        this.TIF = this.page.locator('button').filter({ hasText: 'Time In Force' });
        this.STOP_TYPE = this.page.locator('button').filter({ hasText: 'Stop' });
        this.LIMIT_PRICE = this.page.getByPlaceholder('$');
        this.SIZE = this.page.getByPlaceholder('0.00');
        this.TIME = this.page.getByPlaceholder('0', { exact: true });
        // default expiry
        this.TIME_TYPE = this.page.locator('button').filter({ hasText: EXPIRY_UNIT_TYPE.D });
    }

    public async stopMarketOrder(){
        
    }

    private async trade(price:string, size:string, expiry:EXPIRY_TYPE, duration_type:EXPIRY_UNIT_TYPE, time:number){
        if (!price) {
            await this.MID_BTN.click()
        }
        else {
            await this.LIMIT_PRICE.fill(price)
        }

        await this.SIZE.fill(size);

        if (!expiry) {
            await this.TIF.click();
            await this.page.getByLabel('Good Til Time').getByText(expiry).click();
        }

        if (!time) {
            await this.TIME.fill(time.toString())
        }

        if (!duration_type) {
            await this.TIME.fill(duration_type)
        }

    }
}