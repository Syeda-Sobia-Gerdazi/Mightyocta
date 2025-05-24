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

  getIndustryType(){
     return cy.get('[data-testid="industry-type-combobox"]')
  }

  getNextStepButton() {
    return cy.contains('button', /Next/i).first();
  }

  getCancelButton() {
    return cy.contains('button', /Cancel/i).first();
  }

  getAddTeamMemberButton() {
    return cy.get('[data-testid="next-button"] > span')
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

  // Add global exception handler to suppress the ResizeObserver crash
  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return false; // Prevent test from failing
    }
  });

  // Click on Industry Type (avoid static waits)
  this.getIndustryType().click();

  // Wait for dropdown item to become visible then click
  cy.get('[cmdk-item][data-value="entertainment"]', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Optional: Wait for any async network request after selection
  // cy.intercept('POST', '**/api/project').as('createProject');
  // this.getNextStepButton().click();
  // cy.wait('@createProject');
}

  addTeamMembers(members) {
    this.getAddTeamMemberButton().click();
    members.forEach(member => {
      
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

  getProjectCards() {
    return cy.contains('Project Title').parent().parent();
  }

  getFirstProjectCard() {
    return this.getProjectCards().first();
  }

  clickFirstProject() {
    this.getFirstProjectCard().click();
    cy.url().should('include', '/projects/');
  }
  
  filterByAllProjects() {
    cy.contains('button', 'All Projects').click();
  }
  
  filterByMyProjects() {
    cy.contains('button', 'My Projects').click();
  }
  
  filterBySharedProjects() {
    cy.contains('button', 'Shared Projects').click();
  }
}
