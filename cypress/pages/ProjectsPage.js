export class ProjectsPage {
  visit() {
    cy.visit('https://mightyocto-web-client.vercel.app/projects');
  }

  getYourProjectsHeading() {
    return cy.contains('Your Projects');
  }

  getNewProjectButton() {
    return cy.contains('New Project');
  }

  getAllProjectsTab() {
    return cy.contains('All Projects');
  }

  getMyProjectsTab() {
    return cy.contains('My Projects');
  }

  getSharedProjectsTab() {
    return cy.contains('Shared Projects');
  }

  getProjectNameInput() {
    return cy.get('input').first();
  }

  getProjectDescriptionInput() {
    return cy.get('textarea').first();
  }

  getNextStepButton() {
    return cy.contains('button', /Next/i).first();
  }

  getCancelButton() {
    return cy.contains('button', /Cancel/i).first();
  }

  getAddTeamMemberButton() {
    return cy.contains('button', /Add/i).first();
  }

  getTeamMemberInput() {
    return cy.get('input').eq(1);
  }

  getCreateSubprojectButton() {
    return cy.contains('button', /Create/i).first();
  }

  getFinishButton() {
    return cy.contains('button', /Finish/i).first();
  }

  clickNewProject() {
    this.getNewProjectButton().click();
    cy.url().should('include', '/projects/create');
    cy.wait(2000); // Add a wait to ensure the form is rendered
  }

  filterByAllProjects() {
    this.getAllProjectsTab().click();
  }

  filterByMyProjects() {
    this.getMyProjectsTab().click();
  }

  filterBySharedProjects() {
    this.getSharedProjectsTab().click();
  }

  fillProjectBasics(name, description) {
    this.getProjectNameInput().type(name);
    this.getProjectDescriptionInput().type(description);
    this.getNextStepButton().click();
  }

  addTeamMembers(members) {
    members.forEach(member => {
      this.getAddTeamMemberButton().click();
      this.getTeamMemberInput().last().type(member);
    });
    this.getNextStepButton().click();
  }

  skipSubprojects() {
    this.getNextStepButton().click();
  }

  finishProjectCreation() {
    this.getFinishButton().click();
  }

  createCompleteProject(name, description, members) {
    this.fillProjectBasics(name, description);
    this.addTeamMembers(members);
    this.skipSubprojects();
    this.finishProjectCreation();
  }
}
