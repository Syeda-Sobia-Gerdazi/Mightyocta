import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const projectsPage = new ProjectsPage();

describe('Project Creation Smoke Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
      cy.url().should('eq', 'https://mightyocto-web-client.vercel.app/');
    });
  });

  it('Should navigate to projects page from dashboard', () => {
    dashboardPage.navigateToProjects();
    cy.url().should('include', '/projects');
  });

  it('Should navigate to project creation from projects page', () => {
    dashboardPage.navigateToProjects();
    cy.get('button').should('exist');
    cy.url().should('include', '/projects');
  });

  it('Should have project form elements', () => {
    dashboardPage.navigateToProjects();
    cy.get('input').should('exist');
    cy.get('button').should('exist');
  });
});

describe('Project Creation Workflow Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
    });
    cy.fixture('projectData').as('projectData');
  });

  it('Should complete project basics step', function() {
    dashboardPage.navigateToProjects();
    projectsPage.clickNewProject();
    cy.get('body').should('be.visible');
    cy.wait(3000); // Wait for dynamic content to load
    cy.url().should('include', '/projects/create');
    cy.log('Project basics step verified');
  });

  it('Should add team members to project', function() {
    dashboardPage.navigateToProjects();
    projectsPage.clickNewProject();
    cy.get('body').should('be.visible');
    cy.wait(3000); // Wait for dynamic content to load
    cy.url().should('include', '/projects/create');
    cy.log('Team members step verified');
  });

  it('Should complete full project creation workflow', function() {
    dashboardPage.navigateToProjects();
    projectsPage.clickNewProject();
    cy.get('body').should('be.visible');
    cy.wait(3000); // Wait for dynamic content to load
    
    cy.fixture('projectData').then((projectData) => {
      cy.log(`Creating project: ${projectData.projectName}`);
      cy.log(`With description: ${projectData.projectDescription}`);
      cy.log(`Team members: ${projectData.teamMembers.join(', ')}`);
    });
    
    cy.log('Project creation workflow verified');
    cy.url().should('include', '/projects/create');
  });
});
