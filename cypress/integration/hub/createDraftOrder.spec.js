describe('Orders module',  () => {
  before(() => {
    cy.intercept('/api/v3/client/otp/request?*').as('requestOtp');
    cy.intercept('/api/v3/client/otp/verify?*').as('verifyOtp');
    cy.intercept('/api/v3/vendors/*/customers?*').as('getCustomers')
    cy.intercept('/api/v3/vendors/*/customers/*/outlets').as('getOutlets')
    cy.intercept('/api/v3/vendors/*/price-lists?*')
  })


  it('Create a draft order', () => {
    cy.visit('/');
    cy.get('#mobile-number').click();
    cy.get('#mobile-number').type('1987654321');
    cy.get('[data-cy=button]').click();
    cy.wait('@requestOtp');

    cy.get('.login-container').submit();
    cy.get('[data-cy=otp-field]').click();
    cy.get('[data-cy=otp-field]').type('123123');
    cy.get('[data-cy=button]').click();
    cy.get('.login-container').submit();
    cy.wait('@verifyOtp');

    cy.get('[data-cy=add-order-button]').click();

    cy.wait('@getCustomers')
    cy.get('[data-cy="customer-0"] .center-dot').click();

    cy.wait('@getOutlets')
    cy.get('[data-cy="outlet-0"] .text-sm').click();

    cy.get('[data-cy=order-number]').click();
    cy.get('[data-cy=order-number]').type('Test order-1');
    cy.get('.p-3:nth-child(2)').click();
    cy.get('[data-cy="price-list-0"] .text-sm').click();
    cy.get('[data-cy=item-qty-0]').click();
    cy.get('[data-cy=item-qty-0]').type('23');
    cy.get('[data-cy=add-items-submit]').click();
    cy.get('.justify-center').click();
    cy.get('[data-cy=save-order-as-draft]').click();
  })
})
