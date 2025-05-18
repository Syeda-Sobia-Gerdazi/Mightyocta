export class AIAssistantPage {
  getAIChatButton() {
    return cy.contains('button', 'AI Chat');
  }

  getChatInput() {
    return cy.get('textarea[placeholder="Ask a question..."]');
  }

  getChatMessages() {
    return cy.get('[data-test="chat-message"]');
  }

  getLastChatMessage() {
    return this.getChatMessages().last();
  }

  openAIChat() {
    this.getAIChatButton().click();
  }

  sendChatMessage(message) {
    this.getChatInput().type(message);
    cy.contains('button', 'Send').click();
  }

  getAISuggestions() {
    return cy.get('[data-test="ai-suggestion"]');
  }

  useAISuggestion(index = 0) {
    this.getAISuggestions().eq(index).click();
  }
}
