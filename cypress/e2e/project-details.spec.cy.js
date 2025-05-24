import { LoginPage } from '../pages/LoginPage';
import { ProjectsPage } from '../pages/ProjectsPage';

const loginPage = new LoginPage();
const projectsPage = new ProjectsPage();

describe('Project Details Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
      
      cy.contains('Welcome back').should('be.visible');
      cy.contains('Analytics Overview').should('be.visible');
      
      cy.contains('Projects').click();
      cy.url().should('include', '/projects');
      cy.contains('Your Projects').should('be.visible');
      cy.wait(2000); // Wait for projects to load
    });
  });

  it('Should navigate to project details when clicking a project card', () => {
    cy.get('div').contains('Project Title').first().click();
    
    cy.url().should('include', '/projects/');
    cy.contains('Overview').should('be.visible');
  });

  it('Should show project options menu when clicking options button', () => {
    cy.get('div').contains('Project Title').first().parent().parent().within(() => {
      cy.get('button[aria-haspopup="menu"]').first().click();
    });
    
    cy.get('[role="menuitem"]').should('have.length.at.least', 1);
  });

  it('Should show project details with correct information', () => {
    cy.get('div').contains('Project Title').first().click();
    
    cy.contains('Overview').should('be.visible');
    cy.contains('Team').should('be.visible');
    cy.contains('Documents').should('be.visible');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.get('div').contains('Project Title').first().click();
    
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Overview').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.get('div').contains('Project Title').first().click();
    
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Overview').should('be.visible');
  });
});
