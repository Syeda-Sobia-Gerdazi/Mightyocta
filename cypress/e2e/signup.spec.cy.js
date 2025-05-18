import { SignupPage } from '../pages/SignupPage';

const signupPage = new SignupPage();

const assertNameError = (errorMessage) => {
  signupPage.getNameErrorMessage().should('contain.text', errorMessage);
};

const assertEmailError = (errorMessage) => {
  signupPage.getEmailErrorMessage().should('contain.text', errorMessage);
};

describe('Signup Flow Tests', () => {

  beforeEach(() => {
    signupPage.visit();
  });

  it('Should have all signup fields visible with correct placeholders (Desktop)', () => {
    cy.viewport(1920, 1080);

    signupPage.clickSignupTab();

    signupPage.getNameInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Full Name');

    signupPage.getEmailInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', 'example@example.com');

    signupPage.getPasswordInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', '••••••••');

    signupPage.getConfirmPasswordInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', '••••••••');

    signupPage.getSubmitSignupButton()
      .should('be.visible')
      .and('contain.text', 'Sign Up');
  });

  it('Should have signup fields correctly visible (Mobile)', () => {
    cy.viewport('iphone-12');

    signupPage.clickSignupTab();

    signupPage.getNameInput().should('be.visible');
    signupPage.getEmailInput().should('be.visible');
    signupPage.getPasswordInput().should('be.visible');
    signupPage.getConfirmPasswordInput().should('be.visible');
    signupPage.getSubmitSignupButton().should('be.visible');
  });

  it('Should signup successfully with valid details (Real Backend)', () => {
    const randomNum = Cypress._.random(1000, 9999);
    const fullName = `Test User${randomNum}`;
    const email = `testuser${randomNum}@example.com`;
    const password = 'TestPassword123!';

    signupPage.signup(fullName, email, password, password);

    // ✅ Check user is redirected
    cy.url().should('eq', 'https://mightyocto-web-client.vercel.app/');

    // ✅ Check "Welcome back" text visible
    cy.contains('Welcome back').should('be.visible');

    // ✅ Sidebar checks
    cy.viewport(1920, 1080);
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Projects').should('be.visible');
    cy.contains('Team').should('be.visible');
    cy.contains('Notification & Reminders').should('be.visible');
    cy.contains('Points & Rewards').should('be.visible');

    // ✅ User profile email check
    cy.get('span.truncate.text-xs.text-muted-foreground')
      .should('contain.text', email);
  });

  it('Should show error for short full name', () => {
    cy.viewport(1920, 1080);
    signupPage.clickSignupTab();
    signupPage.getNameInput().type('A');
    signupPage.getSubmitSignupButton().click();
    assertNameError('Name must be at least 2 characters');
  });

  it('Should show error for invalid email format', () => {
    cy.viewport(1920, 1080);
    signupPage.clickSignupTab();
    signupPage.getEmailInput().type('invalidEmail');
    signupPage.getSubmitSignupButton().click();
    assertEmailError('Please enter a valid email address');
  });

  it('Should show both errors when full name and email are invalid', () => {
    cy.viewport(1920, 1080);
    signupPage.clickSignupTab();
    signupPage.getNameInput().type('A');
    signupPage.getEmailInput().type('invalidEmail');
    signupPage.getSubmitSignupButton().click();
    assertNameError('Name must be at least 2 characters');
    assertEmailError('Please enter a valid email address');
  });

});
