describe('robot-factory', () => {
  beforeEach(() => {
    cy.request('GET', '/api/robots/reset');
    cy.visit('/');
  });

  it('should extinguish on_fire robots', () => {
    cy.intercept('GET', '/api/robots').as('loadRobots');
    cy.intercept('GET', '/api/robots/extinguish', (req) => {
      expect(req.body).to.deep.equal([2]);
    }).as('extinguishRobots');
    cy.wait(['@loadRobots', '@extinguishRobots', '@loadRobots']);
  });
});
