export class DocumentPage {
  visit() {
    cy.visit('https://mightyocto-web-client.vercel.app/documents');
  }

  getCreateDocumentButton() {
    return cy.contains('button', 'Create Document');
  }

  getUseAIAssistantButton() {
    return cy.contains('button', 'Use AI Assistant');
  }

  getDocumentTitleInput() {
    return cy.get('input[placeholder="Document Title"]');
  }

  getDocumentContent() {
    return cy.get('[data-test="document-editor"]');
  }

  getAddSectionButton() {
    return cy.contains('button', 'Add Section');
  }

  getSaveButton() {
    return cy.contains('button', 'Save');
  }

  createDocumentFromScratch(title, content) {
    this.getCreateDocumentButton().click();
    this.getDocumentTitleInput().type(title);
    this.getDocumentContent().type(content);
    this.getSaveButton().click();
  }

  createDocumentWithAI(prompt) {
    this.getUseAIAssistantButton().click();
    cy.get('textarea[placeholder="What would you like to create?"]').type(prompt);
    cy.contains('button', 'Generate').click();
    cy.get('[data-test="ai-generated-content"]', { timeout: 10000 }).should('be.visible');
    this.getSaveButton().click();
  }
}
