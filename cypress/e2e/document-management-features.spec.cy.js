import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DocumentPage } from '../pages/DocumentPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const documentPage = new DocumentPage();

describe('Document Management Features Smoke Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
    });
    cy.fixture('documentData').as('documentData');
  });

  it('Should display document creation options', () => {
    cy.contains('Start from scratch').should('be.visible');
    cy.contains('Start with Octo AI').should('be.visible');
  });

  it('Should display analytics overview', () => {
    cy.contains('Analytics Overview').should('be.visible');
    cy.contains('Active Projects').should('be.visible');
    cy.contains('Completed Projects').should('be.visible');
  });
});

describe('Document Management Features Regression Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
    });
    cy.fixture('documentData').as('documentData');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Start from scratch').should('be.visible');
    cy.contains('Start with Octo AI').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Start from scratch').should('be.visible');
    cy.contains('Start with Octo AI').should('be.visible');
  });
});
