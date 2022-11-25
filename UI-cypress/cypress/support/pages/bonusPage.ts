import { baseUrl } from "../constants/constants";
import { BasePage } from "./basePage";

export class BonusPage extends BasePage {
    constructor() {
        super();

        this.url = `${baseUrl}special_offers/bonus.html`
    }
}