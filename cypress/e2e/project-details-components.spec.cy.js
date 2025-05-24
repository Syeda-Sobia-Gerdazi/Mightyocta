import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ProjectDetailsPage } from '../pages/ProjectDetailsPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const projectsPage = new ProjectsPage();
const projectDetailsPage = new ProjectDetailsPage();

describe('Project Structure Tests', () => {
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

  it('Should display project structure section', () => {
    cy.contains('Project Structure').should('be.visible');
    cy.get('table').should('be.visible');
  });

  it('Should display project sections', () => {
    cy.contains('Project Structure').should('be.visible');
    cy.contains('Project Progress').should('be.visible');
    cy.contains('Timeline').should('be.visible');
    cy.contains('Team Activity').should('be.visible');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Project Structure').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Project Structure').should('be.visible');
  });
});

describe('Project Status Tests', () => {
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

  it('Should display project progress', () => {
    cy.contains('Project Progress').should('be.visible');
    cy.contains('68%').should('be.visible');
  });

  it('Should display last updated time', () => {
    cy.contains('Last Updated').should('be.visible');
    cy.contains('ago').should('be.visible');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Project Progress').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Project Progress').should('be.visible');
  });
});

describe('Team Members Tests', () => {
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


  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Team Activity').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Team Activity').should('be.visible');
  });
});

describe('Document Count Tests', () => {
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

  it('Should display document count in project structure', () => {
    cy.contains('Project Structure').should('be.visible');
    cy.contains('Documents').should('be.visible');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Documents').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Documents').should('be.visible');
  });
});

describe('KPI Management Tests', () => {
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
    cy.contains('Manage KPIs').should('be.visible');
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Manage KPIs').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Manage KPIs').should('be.visible');
  });
});
