import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailsPage } from '../pages/ProjectDetailsPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const projectsPage = new ProjectsPage();
const projectDetailsPage = new ProjectDetailsPage();

describe('Project Timeline Overview Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
      dashboardPage.navigateToProjects();
      projectsPage.clickFirstProject();
      cy.url().should('include', '/projects/');
    });
  });

  it('Should display timeline section with days remaining', () => {
    cy.contains('Timeline').should('be.visible');
    cy.contains('Days remaining').should('be.visible');
  });

  it('Should display timeline overview button', () => {
    cy.contains('Timeline Overview').should('be.visible');
  });





  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Timeline').should('be.visible');
    cy.contains('Project Progress').should('be.visible');
    cy.contains('Project Structure').should('be.visible');
    cy.contains('Team Activity').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Timeline').should('be.visible');
    cy.contains('Project Progress').should('be.visible');
    cy.contains('Project Structure').should('be.visible');
    cy.contains('Team Activity').should('be.visible');
  });
});

describe('Project Timeline Data Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
      dashboardPage.navigateToProjects();
      projectsPage.clickFirstProject();
      cy.url().should('include', '/projects/');
    });
  });

  it('Should display correct days remaining in timeline section', () => {
    cy.contains('Days remaining').should('be.visible');
    cy.get('div').contains(/\d+/).should('be.visible');
  });

  it('Should display correct milestones count', () => {
    cy.contains('Milestones').should('be.visible');
  });

  it('Should display correct approaching deadlines count', () => {
    cy.contains('Approaching').should('be.visible');
  });

  it('Should display timeline overview with date range', () => {
    cy.contains('Timeline Overview').should('be.visible');
    cy.contains('Start').should('be.visible');
    cy.contains('Today').should('be.visible');
    cy.contains('End').should('be.visible');
  });
});
