import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailsPage } from '../pages/ProjectDetailsPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const projectsPage = new ProjectsPage();
const projectDetailsPage = new ProjectDetailsPage();

describe('Sub Projects Management Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
      dashboardPage.navigateToProjects();
      cy.get('div').contains('Project Title').first().click();
      cy.url().should('include', '/projects/');
    });
  });

  it('Should display sub projects section with table', () => {
    cy.contains('Sub Projects').should('be.visible');
    cy.get('table').should('be.visible');
  });

  it('Should display add sub project button', () => {
    cy.contains('button', 'Add Sub Project').should('be.visible');
  });

  it('Should display project structure with sub-projects', () => {
    cy.contains('Project Structure').should('be.visible');
    cy.contains('5 Sub-projects').should('be.visible');
  });

  it('Should display sub project list', () => {
    cy.contains('Sub Project 1').should('be.visible');
    cy.contains('Sub Project 2').should('be.visible');
    cy.contains('Sub Project 3').should('be.visible');
  });

  it('Should display sub project details', () => {
    cy.contains('Name').should('be.visible');
    cy.contains('Team').should('be.visible');
    cy.contains('No. of Docs').should('be.visible');
    cy.contains('Last Updated').should('be.visible');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Sub Projects').should('be.visible');
    cy.get('table').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Sub Projects').should('be.visible');
    cy.get('table').should('be.visible');
  });
});
