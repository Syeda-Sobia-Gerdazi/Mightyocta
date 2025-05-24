import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe('Dashboard Analytics Smoke Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
    });
  });

  it('Should display all analytics cards', () => {
    cy.contains('Analytics Overview').should('be.visible');
    cy.contains('Active Projects').should('be.visible');
    cy.contains('Completed Projects').should('be.visible');
    cy.contains('Overdue Tasks').should('be.visible');
    cy.contains('Upcoming Deadlines').should('be.visible');
  });

  it('Should display welcome message and user name', () => {
    cy.contains('Welcome back').should('be.visible');
  });

  it('Should display project sections table', () => {
    cy.contains('Project Sections').should('be.visible');
    cy.get('table').should('be.visible');
  });
});

describe('Dashboard Analytics Regression Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
    });
  });

  it('Should display correct analytics data with trend indicators', () => {
    cy.contains('Active Projects').parent().parent().within(() => {
      cy.get('div').contains(/\d+/).should('be.visible');
      cy.get('span').contains(/\+|-\d+%/).should('be.visible');
    });
    
    cy.contains('Completed Projects').parent().parent().within(() => {
      cy.get('div').contains(/\d+/).should('be.visible');
      cy.get('span').contains(/\+|-\d+%/).should('be.visible');
    });
    
    cy.contains('Overdue Tasks').parent().parent().within(() => {
      cy.get('div').contains(/\d+/).should('be.visible');
      cy.get('span').contains(/\+|-\d+%/).should('be.visible');
    });
    
    cy.contains('Upcoming Deadlines').parent().parent().within(() => {
      cy.get('div').contains(/\d+/).should('be.visible');
      cy.get('span').contains(/\+|-\d+%/).should('be.visible');
    });
  });

  it('Should navigate to projects when clicking on project card', () => {
    cy.contains('Projects').click();
    cy.url().should('include', '/projects');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Analytics Overview').should('be.visible');
    cy.contains('Active Projects').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Analytics Overview').should('be.visible');
    cy.contains('Active Projects').should('be.visible');
  });
});
