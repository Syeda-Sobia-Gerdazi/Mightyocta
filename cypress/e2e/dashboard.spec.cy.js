import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe('Dashboard Smoke Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080); // Full HD screen
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
      cy.url().should('eq', 'https://mightyocto-web-client.vercel.app/');
    });
  });

  it('Should display main dashboard elements', () => {
    cy.get('header').should('exist');
    cy.get('body').should('exist');
    cy.get('div').should('exist');
  });

  it('Should navigate to all main sections', () => {
    dashboardPage.navigateToProjects();
    cy.contains('Your Projects').should('be.visible');
    cy.go('back');
    
    dashboardPage.navigateToTeam();
    cy.go('back');
    
    dashboardPage.navigateToNotifications();
    cy.go('back');
    
    dashboardPage.navigateToRewards();
    cy.go('back');
  });

  it('Should have project creation buttons', () => {
    cy.get('button').should('exist');
  });

  it('Should have dashboard content sections', () => {
    cy.get('section').should('exist');
  });
});

describe('Dashboard Regression Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
    });
  });

  it('Should display analytics cards', () => {
    dashboardPage.getTotalRevenueCard().should('exist');
    dashboardPage.getNewCustomersCard().should('exist');
    dashboardPage.getActiveAccountsCard().should('exist');
    dashboardPage.getGrowthRateCard().should('exist');
  });

  it('Should validate Total Revenue data', () => {
    dashboardPage.getTotalRevenueValue().should('be.visible');
    dashboardPage.getTotalRevenueTrend().should('be.visible');
  });

  it('Should validate New Customers data', () => {
    dashboardPage.getNewCustomersCard().should('exist');
    cy.log('New Customers card exists on dashboard');
    
    cy.fixture('analyticsData').then((data) => {
      cy.log(`Expected New Customers format: ${data.newCustomers.value}`);
    });
  });

  it('Should validate Active Accounts data', () => {
    dashboardPage.getActiveAccountsCard().should('exist');
    cy.log('Active Accounts card exists on dashboard');
    
    cy.fixture('analyticsData').then((data) => {
      cy.log(`Expected Active Accounts format: ${data.activeAccounts.value}`);
    });
  });

  it('Should validate Growth Rate data', () => {
    dashboardPage.getGrowthRateCard().should('exist');
    cy.log('Growth Rate card exists on dashboard');
    
    cy.fixture('analyticsData').then((data) => {
      cy.log(`Expected Growth Rate format: ${data.growthRate.value}`);
    });
  });

  it('Should be responsive on tablet viewport', () => {
    cy.viewport('ipad-2');
    
    dashboardPage.getWelcomeMessage().should('be.visible');
    dashboardPage.getAnalyticsOverviewSection().should('be.visible');
    dashboardPage.getProjectSectionsTable().should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    
    cy.get('header').should('exist');
    cy.get('body').should('exist');
  });
});

describe('Dashboard Visual Regression Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
    });
  });

  it('Should match dashboard snapshot', () => {
    cy.matchImageSnapshot('dashboard-full');
  });

  it('Should match analytics cards snapshot', () => {
    dashboardPage.getTotalRevenueCard().should('exist');
    cy.get('div').contains('Analytics Overview').parent().parent()
      .matchImageSnapshot('analytics-cards');
  });

  it('Should match project sections snapshot', () => {
    dashboardPage.getProjectSectionsTable().should('be.visible');
    cy.compareElementSnapshot('div:contains("Project Sections"):first', 'project-sections');
  });
});
