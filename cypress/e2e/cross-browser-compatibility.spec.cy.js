import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const projectsPage = new ProjectsPage();

describe('Cross-Browser Compatibility Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
    });
  });

  it('Should display dashboard correctly', () => {
    cy.contains('Welcome back').should('be.visible');
    cy.contains('Analytics Overview').should('be.visible');
    cy.contains('Active Projects').should('be.visible');
    cy.contains('Completed Projects').should('be.visible');
    cy.contains('Overdue Tasks').should('be.visible');
    cy.contains('Upcoming Deadlines').should('be.visible');
  });

  it('Should navigate to projects and display projects list', () => {
    dashboardPage.navigateToProjects();
    cy.contains('Your Projects').should('be.visible');
    cy.get('div').contains('Project Title').should('be.visible');
  });

  it('Should display project sections table', () => {
    cy.contains('Project Sections').should('be.visible');
    cy.get('table').should('be.visible');
  });
});
