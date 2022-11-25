import { RegistrationForm } from "./src/registrationForm";
import { expect } from "chai";
import { ERROR_MESSAGES, USER_NAMES } from "./utils/types";

let registrationForm: any;
export const VALID_EMAIL = "l.y.u.b.o.v@gmail.com";
export const VALID_PASSWORD_OF_8_SYMBOLS = "9Aamdsa_";
export const VALID_PASSWORD_OF_9_SYMBOLS = "1yecfgaA#";
export const VALID_PASSWORD_OF_10_SYMBOLS ="99Aammdsa_";

describe("Test for Registration form", () => {
 before("Create class instance", () => {
    registrationForm = new RegistrationForm;
 });
 describe("Positive tests", () => {
    it("Should accept user name of 3 symbols", () => {
        expect(registrationForm.setUserName(USER_NAMES.NAME_OF_3_SYMBOLS)).to.be.equal(USER_NAMES.NAME_OF_3_SYMBOLS);
    })
    it("Should accept user name of 25 symbols", () => {
        expect(registrationForm.setUserName(USER_NAMES.NAME_OF_25_SYMBOLS)).to.be.equal(USER_NAMES.NAME_OF_25_SYMBOLS);
    })
    it("Should accept user name of from 3 to 25 symbols", () => {
        expect(registrationForm.setUserName(USER_NAMES.NAME_OF_19_SYMBOLS)).to.be.equal(USER_NAMES.NAME_OF_19_SYMBOLS);
    })
    it("Should accept valid email", () => {
        expect(registrationForm.setEmail(VALID_EMAIL)).to.be.equal(VALID_EMAIL);
    });
    it("Should accept valid password of 8 symbols", () => {
        expect(registrationForm.setPassword(VALID_PASSWORD_OF_8_SYMBOLS)).to.be.equal(VALID_PASSWORD_OF_8_SYMBOLS);
    });
    it("Should accept valid password of 10 symbols", () => {
        expect(registrationForm.setPassword(VALID_PASSWORD_OF_10_SYMBOLS)).to.be.equal(VALID_PASSWORD_OF_10_SYMBOLS);
    });
    it("Should match previously entered password", () => {
        expect(registrationForm.setPasswordConfirmation(VALID_PASSWORD_OF_9_SYMBOLS, VALID_PASSWORD_OF_9_SYMBOLS)).to.be.true;
    });
 });
 describe("Negative tests", () => {
    it("Should reject user name of 27 symbols", () => {
        expect(() => registrationForm.setUserName(USER_NAMES.NAME_OF_27_SYMBOLS)).to.throw(ERROR_MESSAGES.INVALID_NAME_LENGTH);
    });
    it("Should reject email with 1 symbol in TLD zone name", () => {
        expect(() => registrationForm.setEmail("lyubov.bliznyukovich@gmail.c")).to.throw(ERROR_MESSAGES.INVALID_EMAIL);
    });
    it("Should reject invalid password of 8 symbols without special symbol", () => {
        expect(() => registrationForm.setPassword("sdD2jfss")).to.throw(ERROR_MESSAGES.INVALID_PASSWORD);
    });
    it("Should reject registration with two different passwords", () => {
        expect(() => registrationForm.setPasswordConfirmation(VALID_PASSWORD_OF_8_SYMBOLS, "2Aamdsa_")).to.throw(ERROR_MESSAGES.PASSWORD_CONFIRMATION_FAILED);
    });

 });
})