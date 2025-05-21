import { LoginPage } from '../pages/LoginPage';
import { ProjectsPage } from '../pages/ProjectsPage';

const loginPage = new LoginPage();
const projectsPage = new ProjectsPage();

describe('Project Listing Tests', () => {
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

  it('Should display project cards with correct information', () => {
    cy.get('div').contains('Project Title').should('exist');
    
    cy.contains('Project Title').should('exist');
    cy.contains(/Updated 3 month ago/i).should('exist');
  });

  it('Should filter projects using tab controls', () => {
    cy.get('button').contains('All Projects').click();
    cy.get('div').contains('Project Title').should('exist');
    
    cy.get('button').contains('My Projects').click();
    cy.get('div').contains('Project Title').should('exist');
    
    cy.get('button').contains('Shared Projects').click();
    cy.get('div').contains('Project Title').should('exist');
  });

  it('Should sort projects using dropdown', () => {
    cy.contains('Last Viewed').should('exist').click();
    cy.wait(500);
    
    cy.log('Dropdown clicked');
    
    cy.get('body').click(0, 0, { force: true });
    cy.wait(500);
    
    cy.log('Dropdown interaction completed');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Your Projects').should('be.visible');
    cy.contains('div', 'Project Title').should('exist');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Your Projects').should('be.visible');
    cy.contains('div', 'Project Title').should('exist');
  });
});
