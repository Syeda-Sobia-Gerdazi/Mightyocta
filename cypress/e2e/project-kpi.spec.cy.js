import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailsPage } from '../pages/ProjectDetailsPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const projectsPage = new ProjectsPage();
const projectDetailsPage = new ProjectDetailsPage();

describe('Project KPI Management Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
      dashboardPage.navigateToProjects();
      cy.contains('div', 'Project Title').first().click();
      cy.url().should('include', '/projects/');
    });
  });

  it('Should display manage KPIs button', () => {
    cy.contains('button', 'Manage KPIs').should('be.visible');
  });

  it('Should display project performance metrics', () => {
    cy.get('div').contains('68%').should('be.visible');
    
    cy.get('div').contains('85%').should('be.visible');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('button', 'Manage KPIs').should('be.visible');
    cy.get('div').contains('68%').should('be.visible');
    cy.get('div').contains('85%').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('button', 'Manage KPIs').should('be.visible');
    cy.get('div').contains('68%').should('be.visible');
    cy.get('div').contains('85%').should('be.visible');
  });
});
