export class SignupPage {
    visit() {
      cy.visit('https://mightyocto-web-client.vercel.app/auth/login'); // Same URL for login/signup
    }
  
    clickSignupTab() {
      cy.contains('button', 'Sign Up').click();
    }
  
    getNameInput() {
      return cy.get('input[name="name"]');
    }
  
    getEmailInput() {
      return cy.get('input[name="email"]');
    }
  
    getPasswordInput() {
      return cy.get('input[name="password"]');
    }
  
    getConfirmPasswordInput() {
      return cy.get('input[name="confirmPassword"]');
    }
  
    getSubmitSignupButton() {
      return cy.get('button[type="submit"]');
    }
  
    getNameErrorMessage() {
      return cy.get('p.text-destructive').first();
    }
  
    getEmailErrorMessage() {
      return cy.get('p.text-destructive').eq(1);
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
  