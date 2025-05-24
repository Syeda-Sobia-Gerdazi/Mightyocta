export class DocumentPage {
  visit() {
    cy.visit('https://mightyocto-web-client.vercel.app/documents');
  }

  getCreateDocumentButton() {
    return cy.contains('button', 'Start from scratch');
  }

  getUseAIAssistantButton() {
    return cy.contains('button', 'Start with Octo AI');
  }

  getDocumentTitleInput() {
    return cy.get('input[placeholder="Document Title"]');
  }

  getDocumentContent() {
    return cy.get('[data-test="document-editor"], textarea');
  }

  getAddSectionButton() {
    return cy.contains('button', 'Add Section');
  }

  getSaveButton() {
    return cy.contains('button', 'Save');
  }

  getUploadDocumentButton() {
    return cy.contains('button', 'Upload');
  }

  getVersionHistoryButton() {
    return cy.contains('button', 'Version History');
  }

  getShareButton() {
    return cy.contains('button', 'Share');
  }

  createDocumentFromScratch(title, content) {
    this.getCreateDocumentButton().click();
    this.getDocumentTitleInput().type(title);
    this.getDocumentContent().type(content);
    this.getSaveButton().click();
  }

  createDocumentWithAI(prompt) {
    this.getUseAIAssistantButton().click();
    cy.get('textarea[placeholder="How can I help you today?"]').type(prompt);
    cy.contains('button', 'Generate').click();
    cy.get('[data-test="ai-generated-content"], textarea', { timeout: 10000 }).should('be.visible');
    this.getSaveButton().click();
  }
}
