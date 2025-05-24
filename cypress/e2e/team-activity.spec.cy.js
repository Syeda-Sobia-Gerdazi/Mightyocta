import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailsPage } from '../pages/ProjectDetailsPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const projectsPage = new ProjectsPage();
const projectDetailsPage = new ProjectDetailsPage();

describe('Team Activity Tests', () => {
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

  it('Should display team activity section with weekly activity', () => {
    cy.contains('Team Activity').should('be.visible');
    cy.contains('Weekly Activity').should('be.visible');
    cy.contains('%').should('be.visible');
  });

  it('Should display top performer and inactive count', () => {
    cy.contains('Top: Alex').should('be.visible');
    cy.contains('2 Inactive').should('be.visible');
  });

  it('Should display team members list', () => {
    cy.contains('Team').should('be.visible');
    cy.get('table tbody tr').find('td').eq(1).find('div img').should('be.visible');
  });

  it('Should display activity chart', () => {
    cy.contains('Weekly Activity').should('be.visible');
    cy.get('svg, rect, div[class*="bg-"]').should('be.visible');
  });

  it('Should navigate to team tab', () => {
    cy.contains('Team Activity').should('be.visible');
    cy.contains('85%').should('be.visible');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Team Activity').should('be.visible');
    cy.contains('Weekly Activity').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Team Activity').should('be.visible');
    cy.contains('Weekly Activity').should('be.visible');
  });
});
