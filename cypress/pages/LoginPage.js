export class LoginPage {
  visit() {
    cy.visit('https://mightyocto-web-client.vercel.app/auth/login');
  }

  clickLoginTab() {
    cy.contains('button', 'Login').click();
  }

  getEmailInput() {
    return cy.get('[data-test-id="email-input"]');
  }

  getPasswordInput() {
    return cy.get('[data-test-id="password-input"]');
  }

  getSubmitLoginButton() {
    return cy.get('[data-test-id="submit-button"]');
  }

  login(email, password) {
    this.clickLoginTab(); // Ensure Login Tab is active first
    this.getEmailInput().type(email);
    this.getPasswordInput().type(password);
    this.getSubmitLoginButton().click();
  }
}
