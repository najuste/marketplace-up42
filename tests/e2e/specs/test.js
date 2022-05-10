import { dataAPI } from '@/dataProvider.ts';
import { blockData } from '../fixtures.ts';

describe('Marketplace view: ', () => {
    beforeEach(() => {
        cy.intercept(dataAPI, (req) => {
            req.reply(blockData);
        }).as('data');
        cy.visit('/');
    });
    it('It has a loading state while waiting for API response', () => {
        cy.get('[data-test-spinner]').should('be.visible');
        cy.wait('@data');
    });
    it('User sees items only with blockPricingStrategy type simple', () => {
        // TODO: unit test would fit better, fixture provides 4 items, only 3 should match
        cy.get('[data-test-block-item]').should('have.length', 3);
    });
    it('User starts with 10.000 credits', () => {
        cy.get('[data-test-credits]').should('contain', 10000);
    });
    it('User can click "Add to cart" on item and item should be added to the cart area; total should update', () => {
        cy.get('[data-test-block-item="add"]').first().click();
        cy.get('[data-test-the-cart="item"]').should('have.length', 1);
        cy.get('[data-test-the-cart="total"]').should('contain', 3000);
    });
    it('User can click "Add to cart" on the same item multiple times and item ammount should increase; total should update', () => {
        cy.get('[data-test-block-item="add"]').first()
            .click()
            .click();
        cy.get('[data-test-the-cart="item"]').should('have.length', 1);
        cy.get('[data-test-the-cart="total"]').should('contain', 6000);
    });
    it('User can reduce the product amount or finally remove product from the cart', () => {
        cy.get('[data-test-the-cart="item"]').should('have.length', 0);
        cy.get('[data-test-block-item="add"]').first()
            .click()
            .click();
        cy.get('[data-test-the-cart="item"]').should('have.length', 1);
        cy.get('[data-test-the-cart="removeItem"]').first().click(); // amount reduced
        cy.get('[data-test-the-cart="item"]').should('have.length', 1);
        cy.get('[data-test-the-cart="removeItem"]').first().click();
        cy.get('[data-test-the-cart="item"]').should('have.length', 0);
    });
    it('User can click "By now" and this should remove the items from the cart and update available credits', () => {
        cy.get('[data-test-block-item="add"]').first()
            .click()
            .click(); // 6000
        cy.get('[data-test-the-cart="buy"]').click();
        cy.get('[data-test-the-cart="item"]').should('have.length', 0);
        cy.get('[data-test-credits]').should('contain', 4000);
    });
    it('User should see an error message if he tries to buy over credits allowance', () => {
        cy.get('[data-test-block-item="add"]').first()
            .click()
            .click()
            .click()
            .click(); // 12000
        cy.get('[data-test-the-cart="buy"]').click();
        cy.get('.alert').should('contain', 'You do not have sufficient credits.');
        cy.get('[data-test-credits]').should('contain', 10000);
    });
});
