export class SignupPage {
    visit() {
      cy.visit('https://mightyocto-web-client.vercel.app/auth/login'); // Same URL for login/signup
    }
  
    clickSignupTab() {
      cy.get('[data-test-id="signup-tab"]').click();
    }
  
    getNameInput() {
      return cy.get('[data-test-id="name-input"]');
    }
  
    getEmailInput() {
      return cy.get('[data-test-id="email-input"]');
    }
  
    getPasswordInput() {
      return cy.get('[data-test-id="password-input"]');
    }
  
    getConfirmPasswordInput() {
      return cy.get('[data-test-id="confirm-password-input"]');
    }
  
    getSubmitSignupButton() {
      return cy.get('[data-test-id="submit-button"]');
    }
  
    getNameErrorMessage() {
      return cy.get('[data-test-id="name-error-message"]');
    }
  
    getEmailErrorMessage() {
      return cy.get('[data-test-id="email-error-message"]');
    }
  
    signup(fullName, email, password, confirmPassword) {
      this.clickSignupTab();
      this.getNameInput().type(fullName);
      this.getEmailInput().type(email);
      this.getPasswordInput().type(password);
      this.getConfirmPasswordInput().type(confirmPassword);
      this.getSubmitSignupButton().click();
    }
  }
  