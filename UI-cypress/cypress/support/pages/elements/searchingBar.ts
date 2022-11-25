import { textForSearch } from "../../constants/constants";

export class SearchingBar {
    constructor() {}
    
    public getSearchingForm() {
        return cy.get('input[placeholder="Поиск товаров"]');
    }
    public clickOnSearchingForm() {
        this.getSearchingForm().click();
    }
    public getPopularSearchingRequests() {
        return cy.get('.SearchSuggestList_title__1KIok').contains("Популярное");
    }
    public searchFor() {
        this.getSearchingForm().type(`${textForSearch}{enter}`);
    }
    public getSearchingResults() {
        return cy.get("h1").contains("Результаты поиска");
    }
}