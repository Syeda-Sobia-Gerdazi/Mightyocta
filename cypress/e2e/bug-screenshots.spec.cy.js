import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProjectsPage } from '../pages/ProjectsPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const projectsPage = new ProjectsPage();

describe('Bug Screenshot Capture', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
      cy.url().should('eq', 'https://mightyocto-web-client.vercel.app/');
    });
  });

  it('Bug #1: Inconsistent trend indicators on analytics cards', () => {
    cy.viewport(1200, 800);
    
    dashboardPage.getTotalRevenueCard().should('be.visible');
    dashboardPage.getNewCustomersCard().should('be.visible');
    
    cy.get('div').contains('Analytics Overview').parent().parent()
      .screenshot('bug1-inconsistent-trend-indicators');
      
    dashboardPage.getTotalRevenueTrend().should('exist');
    dashboardPage.getNewCustomersTrend().should('exist');
    cy.log('Bug #1: Some trend indicators show inconsistent styling or formatting');
  });

  it('Bug #2: Empty Team section without proper messaging', () => {
    dashboardPage.navigateToTeam();
    
    cy.wait(2000);
    
    cy.screenshot('bug2-empty-team-section');
    
    cy.contains('No team members found').should('not.exist');
    cy.log('Bug #2: Team section is empty without proper messaging or guidance');
  });

  it('Bug #3: Missing validation on project creation form', () => {
    dashboardPage.navigateToProjects();
    projectsPage.clickNewProject();
    
    projectsPage.getNextStepButton().click();
    
    cy.screenshot('bug3-missing-form-validation');
    
    cy.contains('This field is required').should('not.exist');
    cy.log('Bug #3: Project creation form allows proceeding without filling required fields');
  });

  it('Bug #4: Mobile viewport alignment issues', () => {
    cy.viewport('iphone-x');
    
    cy.wait(1000);
    
    dashboardPage.getAnalyticsOverviewSection().should('be.visible');
    cy.screenshot('bug4-mobile-alignment-issues');
    
    cy.log('Bug #4: Analytics cards show alignment issues on mobile viewport');
  });
});
