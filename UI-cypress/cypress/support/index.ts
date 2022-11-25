/// <reference types="cypress" />

import "@shelex/cypress-allure-plugin";

Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
})