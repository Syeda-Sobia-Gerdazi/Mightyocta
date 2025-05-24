export class DashboardPage {
  visit() {
    cy.visit('https://mightyocto-web-client.vercel.app/');
  }

  getDashboardNavLink() {
    return cy.contains('Dashboard');
  }

  getProjectsNavLink() {
    return cy.contains('Projects');
  }

  getTeamNavLink() {
    return cy.contains('Team');
  }

  getNotificationsNavLink() {
    return cy.contains('Notifications');
  }

  getRewardsNavLink() {
    return cy.contains('Rewards');
  }

  getWelcomeMessage() {
    return cy.contains('Welcome back');
  }

  getAnalyticsOverviewSection() {
    return cy.contains('Analytics Overview').parent();
  }

  getProjectSectionsTable() {
    return cy.contains('Project Sections').parent();
  }

  getActiveWorkSuggestionsPanel() {
    return cy.get('div').contains('Suggested').parent();
  }

  getTotalRevenueCard() {
    return cy.get('div[role="region"]').first();
  }

  getNewCustomersCard() {
    return cy.get('div[role="region"]').eq(1);
  }

  getActiveAccountsCard() {
    return cy.get('div[role="region"]').eq(2);
  }

  getGrowthRateCard() {
    return cy.get('div[role="region"]').eq(3);
  }

  getTotalRevenueValue() {
    return this.getTotalRevenueCard().find('span, div, p').first();
  }
  
  getTotalRevenueTrend() {
    return this.getTotalRevenueCard().find('span, div, p').eq(1);
  }
  
  getNewCustomersValue() {
    return this.getNewCustomersCard().find('span, div, p').first();
  }
  
  getNewCustomersTrend() {
    return this.getNewCustomersCard().find('span, div, p').eq(1);
  }
  
  getActiveAccountsValue() {
    return this.getActiveAccountsCard().find('span, div, p').first();
  }
  
  getActiveAccountsTrend() {
    return this.getActiveAccountsCard().find('span, div, p').eq(1);
  }
  
  getGrowthRateValue() {
    return this.getGrowthRateCard().find('span, div, p').first();
  }
  
  getGrowthRateTrend() {
    return this.getGrowthRateCard().find('span, div, p').eq(1);
  }

  getNewProjectButton() {
    return cy.get('button').first();
  }

  getStartFromScratchButton() {
    return cy.get('button').contains(/create|new|document/i).first();
  }

  getStartWithOctoAIButton() {
    return cy.get('button').contains(/ai|assistant|octo/i).first();
  }

  navigateToProjects() {
    this.getProjectsNavLink().click();
    cy.url().should('include', '/projects');
  }

  navigateToTeam() {
    this.getTeamNavLink().click();
    cy.url().should('include', '/team');
  }

  navigateToNotifications() {
    this.getNotificationsNavLink().click();
    cy.url().should('include', '/notifications');
  }

  navigateToRewards() {
    this.getRewardsNavLink().click();
    cy.contains('Rewards').should('be.visible');
  }

  clickNewProject() {
    this.getNewProjectButton().click();
    cy.url().should('include', '/projects/create');
  }

  clickStartFromScratch() {
    this.getStartFromScratchButton().click();
  }

  clickStartWithOctoAI() {
    this.getStartWithOctoAIButton().click();
  }

  getActiveProjectsCard() {
    return cy.contains('Active Projects').parent().parent();
  }

  getCompletedProjectsCard() {
    return cy.contains('Completed Projects').parent().parent();
  }

  getOverdueTasksCard() {
    return cy.contains('Overdue Tasks').parent().parent();
  }

  getUpcomingDeadlinesCard() {
    return cy.contains('Upcoming Deadlines').parent().parent();
  }

  clickActiveProjectsCard() {
    this.getActiveProjectsCard().click();
  }

  getUserName() {
    return cy.contains('Welcome back').next();
  }
}
