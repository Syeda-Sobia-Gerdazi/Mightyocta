// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport', // capture viewport in screenshot
});

Cypress.Commands.add('compareElementSnapshot', (element, name, options = {}) => {
  cy.get(element).matchImageSnapshot(name, options);
});

Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://mightyocto-web-client.vercel.app/api/auth/login',
    body: {
      email,
      password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    window.localStorage.setItem('authToken', response.body.token);
  });
});

Cypress.Commands.add('getAnalyticsData', () => {
  return cy.request({
    method: 'GET',
    url: 'https://mightyocto-web-client.vercel.app/api/analytics',
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('authToken')}`
    }
  });
});

Cypress.Commands.add('getProjects', () => {
  return cy.request({
    method: 'GET',
    url: 'https://mightyocto-web-client.vercel.app/api/projects',
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('authToken')}`
    }
  });
});
