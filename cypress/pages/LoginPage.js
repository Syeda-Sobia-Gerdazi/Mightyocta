export class LoginPage {
  visit() {
    cy.visit('https://mightyocto-web-client.vercel.app/auth/login');
  }

  clickLoginTab() {
  }

  getEmailInput() {
    return cy.get('input[name="email"]');
  }

  getPasswordInput() {
    return cy.get('input[name="password"]');
  }

  getSubmitLoginButton() {
    return cy.get('button[type="submit"]');
  }

  login(email, password) {
    this.getEmailInput().type(email);
    this.getPasswordInput().type(password);
    this.getSubmitLoginButton().click();
  }
}
