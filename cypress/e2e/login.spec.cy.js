import { LoginPage } from '../pages/LoginPage';

const loginPage = new LoginPage();

// Utility function to assert login error messages
const assertLoginError = (errorMessage) => {
  cy.get('p.text-destructive').should('contain.text', errorMessage);
};

describe('Login Flow Tests', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080); // Full HD screen
    loginPage.visit();
  });

  it('Should have all login fields visible with correct placeholders (Desktop)', () => {
    loginPage.clickLoginTab();

    loginPage.getEmailInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', 'email@example.com');

    loginPage.getPasswordInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', '••••••••');

    loginPage.getSubmitLoginButton()
      .should('be.visible')
      .and('contain.text', 'Sign In');
  });

  it('Should have login fields correctly visible (Mobile)', () => {
    cy.viewport(390, 844); // iPhone 13 dimensions

    loginPage.clickLoginTab();

    loginPage.getEmailInput().should('be.visible');
    loginPage.getPasswordInput().should('be.visible');
    loginPage.getSubmitLoginButton().should('be.visible');
  });

  it('Should login with valid credentials and verify dashboard (Real Backend)', () => {
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);

      // 1. Confirm URL
      cy.url().should('eq', 'https://mightyocto-web-client.vercel.app/');

      // 2. Check "Welcome back" text
      cy.contains('Welcome back').should('be.visible');

      // 3. Confirm "Analytics Overview" section
      cy.contains('Analytics Overview').should('be.visible');

      // 4. Sidebar Menu checks
      cy.contains('Dashboard').should('be.visible');
      cy.contains('Projects').should('be.visible');
      cy.contains('Team').should('be.visible');
      cy.contains('Notification').should('be.visible');
      cy.contains('Rewards').should('be.visible');

      // 5. Check User Profile Email (bottom)
      cy.get('span.truncate.text-xs.text-muted-foreground')
      .should('contain.text', credentials.email)
    });
  });

  it('Should show error for invalid email format', () => {
    loginPage.clickLoginTab();
    loginPage.getEmailInput().type('invalidEmail');
    loginPage.getSubmitLoginButton().click();
    assertLoginError('Please enter a valid email address');
  });

  it('Should show error for short password', () => {
    loginPage.clickLoginTab();
    loginPage.getPasswordInput().type('123');
    loginPage.getSubmitLoginButton().click();
    assertLoginError('Password must be at least 6 characters');
  });

  it('Should show both errors when both email and password are invalid', () => {
    loginPage.clickLoginTab();
    loginPage.getEmailInput().type('invalidEmail');
    loginPage.getPasswordInput().type('123');
    loginPage.getSubmitLoginButton().click();
    assertLoginError('Please enter a valid email address');
    assertLoginError('Password must be at least 6 characters');
  });

});
