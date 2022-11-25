import { baseUrl } from "../constants/constants";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
    constructor() {
        super();

        this.url = baseUrl;
    }

    public getBonusButton() {
        return cy.get('a[href="/special_offers/bonus.html"]').contains("Бонусная программа")
    }
    public clickOnBonusButton() {
        this.getBonusButton().click();
    }
    public getCatalogButton() {
        return cy.get("span").contains("Каталог товаров");
    }
    public clickOnCatalogButton() {
        this.getCatalogButton().click();
    }
    public getSectionButton() {
        return cy.get(".styles_categoryName__28yR1").contains("Крупная техника для кухни");
    }
}