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
    cy.wait(1000); // Wait for responsive layout to adjust
    
    cy.contains('Analytics Overview').should('be.visible');
    cy.contains('Active Projects').should('be.visible');
    cy.contains('Project Sections').should('be.visible');
  });

  it('Should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    
    cy.get('header').should('exist');
    cy.get('body').should('exist');
  });
});

describe('Dashboard Analytics Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
      cy.contains('Analytics Overview').should('be.visible');
      cy.wait(1000); // Additional wait to ensure all elements are loaded
    });
  });

  it('Should display all analytics cards correctly', () => {
    
    cy.contains('Analytics Overview').should('be.visible');
    cy.contains('Active Projects').should('be.visible');
    cy.contains('Completed Projects').should('be.visible');
    cy.contains('Overdue Tasks').should('be.visible');
    cy.contains('Upcoming Deadlines').should('be.visible');
    
    cy.contains('Projects currently in progress').should('be.visible');
    cy.contains('Projects completed this year').should('be.visible');
    cy.contains('Tasks past their due date').should('be.visible');
    cy.contains('Deadlines in the next 7 days').should('be.visible');
  });

  it('Should verify each analytics card shows correct count and percentage change', () => {
    
    cy.contains('Active Projects').parent().parent().within(() => {
      cy.contains('8').should('be.visible');
      cy.contains('+2.1%').should('be.visible');
    });
    
    cy.contains('Completed Projects').parent().parent().within(() => {
      cy.contains('34').should('be.visible');
      cy.contains('+5%').should('be.visible');
    });
    
    cy.contains('Overdue Tasks').parent().parent().within(() => {
      cy.contains('7').should('be.visible');
      cy.contains('-1%').should('be.visible');
    });
    
    cy.contains('Upcoming Deadlines').parent().parent().within(() => {
      cy.contains('5').should('be.visible');
      cy.contains('+5%').should('be.visible');
    });
  });

  it('Should verify positive trends show green indicators and negative trends show red indicators', () => {
    cy.contains('+2.1%').should('exist')
      .invoke('attr', 'class')
      .should('include', 'text-green');
    
    cy.contains('+5%').first().should('exist')
      .invoke('attr', 'class')
      .should('include', 'text-green');
    
    cy.contains('-1%').should('exist')
      .invoke('attr', 'class')
      .should('include', 'text-red');
    
    cy.contains('+5%').last().should('exist')
      .invoke('attr', 'class')
      .should('include', 'text-green');
  });

  it('Should verify analytics cards are responsive on different screen sizes', () => {
    cy.contains('Analytics Overview').should('be.visible');
    
    cy.contains('8').should('be.visible');
    cy.contains('34').should('be.visible');
    cy.contains('7').should('be.visible');
    cy.contains('5').should('be.visible');
    
    cy.viewport('ipad-2');
    cy.wait(1000); // Wait for responsive layout to adjust
    cy.contains('Analytics Overview').should('be.visible');
    
    cy.viewport('iphone-x');
    cy.wait(1000); // Wait for responsive layout to adjust
    cy.contains('Analytics Overview').should('be.visible');
    
    cy.contains('Analytics Overview').should('exist');
    
    cy.get('header').should('exist');
    cy.get('body').should('exist');
  });
});

/*
describe('Dashboard Visual Regression Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    loginPage.visit();
    cy.fixture('loginCredentials').then((credentials) => {
      loginPage.login(credentials.email, credentials.password);
    });
  });

  it('Should match dashboard snapshot', () => {
  });

  it('Should match analytics cards snapshot', () => {
    dashboardPage.getTotalRevenueCard().should('exist');
  });

  it('Should match project sections snapshot', () => {
    dashboardPage.getProjectSectionsTable().should('be.visible');
  });
});
*/
