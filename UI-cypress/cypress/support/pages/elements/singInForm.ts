import { validLogin } from "../../constants/constants";

export class SignInForm {
    constructor() {}
    
    public getSignInButton() {
        return cy.get('span').contains("Войти");
    }
    public clickOnSignInButton() {
        this.getSignInButton().click();
    }
    public getAccountButton() {
        return cy.get('.userToolsText').contains('Аккаунт');
    }
    public clickOnAccountButton() {
        this.getAccountButton().click();
    }
    public getSignInForm() {
        return cy.get('.style_formTitle__hRNRz');
    }
    public getLoginInput() {
        return cy.get('input[label="Электронная почта"]');
    }
    public getPasswordInput() {
        return cy.get('input[label="Пароль"]');
    }
    public getSubmitButton() {
        return cy.get('button[data-testid="loginSubmit"]').contains('Войти');
    }
    public performSignIn(login: string, password: string) {
        this.getLoginInput().type(login);
        this.getPasswordInput().type(password);
        this.getSubmitButton().click();
    }
    public getErrorMassage() {
        return cy.get('.input-error-message__message');
    }
}