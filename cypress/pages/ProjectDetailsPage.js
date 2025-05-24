export class ProjectDetailsPage {
  visit(projectId = 1) {
    cy.visit(`https://mightyocto-web-client.vercel.app/projects/${projectId}`);
  }

  getOverviewTab() {
    return cy.contains('Overview');
  }

  getTeamTab() {
    return cy.contains('Team');
  }

  getDocumentsTab() {
    return cy.contains('Documents');
  }

  getTasksTab() {
    return cy.contains('Tasks');
  }

  getProjectStructureSection() {
    return cy.contains('Project Structure').parent().parent();
  }

  getSubProjectsList() {
    return this.getProjectStructureSection().find('li');
  }

  getSubProjectByName(name) {
    return this.getProjectStructureSection().contains(name);
  }

  getDocumentsCount() {
    return cy.contains('Documents').next();
  }

  getTeamMembersCount() {
    return cy.contains('Team Members').next();
  }

  getProjectProgressSection() {
    return cy.contains('Project Progress').parent().parent();
  }

  getProgressPercentage() {
    return this.getProjectProgressSection().find('div').contains('%');
  }

  getCompletedTasksCount() {
    return this.getProjectProgressSection().contains('Completed').next();
  }

  getInProgressTasksCount() {
    return this.getProjectProgressSection().contains('In Progress').next();
  }

  getNotStartedTasksCount() {
    return this.getProjectProgressSection().contains('Not Started').next();
  }

  getTimelineSection() {
    return cy.contains('Timeline').parent().parent();
  }

  getDaysRemainingCount() {
    return this.getTimelineSection().contains('Days remaining');
  }

  getTimelineOverviewButton() {
    return this.getTimelineSection().contains('Timeline Overview');
  }

  getMilestonesCount() {
    return cy.contains('Milestones').next();
  }

  getApproachingDeadlinesCount() {
    return cy.contains('Approaching').next();
  }

  getTeamActivitySection() {
    return cy.contains('Team Activity').parent().parent();
  }

  getWeeklyActivityPercentage() {
    return this.getTeamActivitySection().contains('%');
  }

  getTopPerformerName() {
    return cy.contains('Top:').next();
  }

  getInactiveCount() {
    return cy.contains('Inactive').next();
  }

  getSubProjectsSection() {
    return cy.contains('Sub Projects').parent().parent();
  }

  getAddSubProjectButton() {
    return cy.contains('button', 'Add Sub Project');
  }

  getSubProjectNameInput() {
    return cy.get('input[placeholder="Enter sub project name"]');
  }

  getAddSubProjectSubmitButton() {
    return cy.contains('button', 'Add Sub Project').last();
  }

  getSubProjectsTable() {
    return this.getSubProjectsSection().find('table');
  }

  getSubProjectRows() {
    return this.getSubProjectsTable().find('tr').not(':first-child');
  }

  getManageKPIsButton() {
    return cy.contains('button', 'Manage KPIs');
  }

  clickOverviewTab() {
    this.getOverviewTab().click();
  }

  clickTeamTab() {
    this.getTeamTab().click();
  }

  clickDocumentsTab() {
    this.getDocumentsTab().click();
  }

  clickTasksTab() {
    this.getTasksTab().click();
  }

  clickTimelineOverview() {
    this.getTimelineOverviewButton().click();
  }

  clickAddSubProject() {
    this.getAddSubProjectButton().click();
  }

  createSubProject(name) {
    this.clickAddSubProject();
    this.getSubProjectNameInput().type(name);
    this.getAddSubProjectSubmitButton().click();
  }

  clickManageKPIs() {
    this.getManageKPIsButton().click();
  }

  getTimelineModal() {
    return cy.contains('Project Timeline & Milestones').parent().parent();
  }

  getTimelineTab() {
    return this.getTimelineModal().contains('Timeline');
  }

  getMilestonesTab() {
    return this.getTimelineModal().contains('Milestones');
  }

  getCalendarTab() {
    return this.getTimelineModal().contains('Calendar');
  }

  getProjectDuration() {
    return this.getTimelineModal().contains('Project Duration');
  }

  getElapsedTime() {
    return this.getTimelineModal().contains('Elapsed Time');
  }

  getRemainingTime() {
    return this.getTimelineModal().contains('Remaining Time');
  }

  getTotalDuration() {
    return this.getTimelineModal().contains('Total Duration');
  }

  getProjectPhases() {
    return this.getTimelineModal().contains('Project Phases');
  }

  closeTimelineModal() {
    this.getTimelineModal().find('button[aria-label="Close"]').click();
  }
}
