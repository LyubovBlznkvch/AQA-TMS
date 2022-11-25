import { SearchingBar } from "./elements/searchingBar";
import { SignInForm } from "./elements/singInForm";


export class BasePage {
    protected url!: string;
    public signInForm: SignInForm;
    public searchingBar: SearchingBar;

    constructor() {
        this.signInForm = new SignInForm();
        this.searchingBar = new SearchingBar();
    }

    public visitPage() {
        cy.visit(this.url)
    }
    public getCurrentUrl() {
        return cy.url();
    }
    public getPageTitle() {
       return cy.title();
    }
    public waitForTitleIncludeText(titleText: string) {
        this.getPageTitle().should("include", titleText)
    }
}