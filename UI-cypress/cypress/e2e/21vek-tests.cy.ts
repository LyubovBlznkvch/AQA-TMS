import { HomePage } from "../support/pages/homePage";
import { BonusPage } from "../support/pages/bonusPage";
import { PageFactory } from "../support/pages/pageFactory";
import { ERROR_MESSAGES, PAGES } from "../support/types/types";
import { generateAlphabeticString } from "../support/helpers/helper";
import { validLogin } from "../support/constants/constants"; 


const homePage = PageFactory.getPage(PAGES.HOME) as HomePage;
const bonusPage = PageFactory.getPage(PAGES.BONUS) as BonusPage;

const invalidPassword = generateAlphabeticString(10);
const invalidLogin = generateAlphabeticString(10);


describe("21vek.by tests - Navigation", () => {
    before(() => {
        homePage.visitPage();
        cy.intercept("GET", "https://www.21vek.by/users/session/office/").as("basket");
    });

    it("Should display page title correctly", () => {
        homePage.clickOnBonusButton();
        cy.wait("@basket").then(data => {
            expect(data.response?.statusCode).to.equal(200);
        });
        bonusPage.waitForTitleIncludeText("Бонусная программа");
    });

    it("Should select the section correctly", () => {
        homePage.clickOnCatalogButton();
        homePage.getSectionButton().should('be.visible');
    });

});

describe("21vek.by tests - Searching bar", () => {
    before(() => {
        homePage.visitPage();
    });
    
    it("Should display popular requests after clicking on empty searching bar", () => {
        homePage.searchingBar.clickOnSearchingForm();
        homePage.searchingBar.getPopularSearchingRequests().should('be.visible');
    });

    it("Should display form with searching results correctly", () => {
        homePage.searchingBar.searchFor();
        homePage.searchingBar.getSearchingResults().should('be.visible');
    });

});

describe("21vek.by tests - Sign-in form", () => {
    beforeEach(() => {
        homePage.visitPage();
        homePage.signInForm.clickOnAccountButton();
        homePage.signInForm.clickOnSignInButton();
        homePage.signInForm.getSignInForm().should('be.visible');
    });

    it("Should display correct error massage after sign-in with password only", () => {
        homePage.signInForm.performPassswordInput(invalidPassword);
        homePage.signInForm.getErrorMassage().invoke("text").then(( text:string ) => {
            expect(text).to.include(ERROR_MESSAGES.EMPTY_LOGIN_FIELD);
        });
    });

    it("Should display correct error massage after sign-in with login only", () => {
        homePage.signInForm.performValidLoginInput();
        homePage.signInForm.getErrorMassage().invoke("text").then(( text:string ) => {
            expect(text).to.include(ERROR_MESSAGES.EMPTY_PASSWORD_FIELD);
        });
    });

    it("Should display correct error massage after sign-in with invalid password", () => {
        homePage.signInForm.performSignIn(validLogin, invalidPassword);
        homePage.signInForm.getErrorMassage().invoke("text").then(( text:string ) => {
            expect(text).to.include(ERROR_MESSAGES.INVALID_PASSWORD);
        });
    });

    it("Should display correct error massage after sign-in with invalid login", () => {
        homePage.signInForm.performSignIn(invalidLogin, invalidPassword);
        homePage.signInForm.getErrorMassage().invoke("text").then(( text:string ) => {
            expect(text).to.include(ERROR_MESSAGES.INVALID_LOGIN);
        });
    });
});