describe('Login', () => {
  beforeEach(() => {
    cy.intercept('/api/v3/client/otp/request?*').as('requestOtp')
    cy.intercept('/api/v3/client/otp/verify?*').as('verifyOtp')
  })

  it('should allow user to login with correct phone number and OTP', () => {
    cy.visit('https://hub-qa.fmhlabs.com/');

    cy.get('#mobile-number').click();
    cy.get('#mobile-number').type('1987654321');
    cy.get('[data-cy=button]').click();
    cy.get('.login-container').submit();

    // type in OTP
    cy.wait('@requestOtp')
    cy.get('[data-cy=otp-field]').type('123123');
    cy.get('[data-cy=button]').click();
    cy.get('.login-container').submit();

    cy.wait('@verifyOtp')
    cy.get('[data-cy=greeting]').should('be.visible').contains('Hello,')
  })

  it('should not allow login with incorrect phone number', () => {
    cy.visit('https://hub-qa.fmhlabs.com/');

    cy.get('#mobile-number').click();
    cy.get('#mobile-number').type('1987654321232');
    cy.get('[data-cy=button]').click();
    cy.get('.login-container').submit();

    cy.wait('@requestOtp')
    cy.get('.text-salmon-500')
      .should('be.visible')
      .contains('Incorrect phone number')
  })
})