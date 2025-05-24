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
   
    cy.url().should('include', '/projects');
    cy.get('.gap-4 > [tabindex="0"] > .cursor-pointer').click()
    cy.fixture('projectData').then((projectData) => {
      projectsPage.getProjectNameInput().should('be.visible');
      projectsPage.getProjectDescriptionInput().should('be.visible');
      projectsPage.fillProjectBasics(projectData.projectName, projectData.projectDescription);
    });
    
    cy.contains('Add team members').should('be.visible');
  });

  it('Should add team members to project', function() {
    dashboardPage.navigateToProjects();
    projectsPage.clickNewProject();
    cy.get('body').should('be.visible');
    cy.wait(3000); // Wait for dynamic content to load
        cy.get('.gap-4 > [tabindex="0"] > .cursor-pointer').click()
    cy.fixture('projectData').then((projectData) => {
      projectsPage.fillProjectBasics(projectData.projectName, projectData.projectDescription);
    });
    
    cy.fixture('projectData').then((projectData) => {
      projectsPage.addTeamMembers(projectData.teamMembers);
    });
    
    cy.contains('Create sub-projects').should('be.visible');
  });

  it('Should complete full project creation workflow', function() {
    dashboardPage.navigateToProjects();
    projectsPage.clickNewProject();
    cy.get('body').should('be.visible');
    cy.wait(3000); // Wait for dynamic content to load
        cy.get('.gap-4 > [tabindex="0"] > .cursor-pointer').click()
    cy.fixture('projectData').then((projectData) => {
      projectsPage.fillProjectBasics(projectData.projectName, projectData.projectDescription);
      
      projectsPage.addTeamMembers(projectData.teamMembers);
      
      projectsPage.skipSubprojects();
      
      projectsPage.finishProjectCreation();
      
      cy.url().should('include', '/projects');
      cy.contains(projectData.projectName).should('exist');
    });
  });
});
