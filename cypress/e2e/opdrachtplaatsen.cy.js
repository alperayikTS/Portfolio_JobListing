describe('Opdrachtplaatsen', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/opdrachtplaatsen')
    cy.wait(1000)
  })

  it('opdracht aanmaken', () => {
    cy.get('#title').type('Project manager bij Tulipsoft')
    cy.wait(500)
    cy.get('#beschrijving').type('Werken bij tulipsoft als project manager')
    cy.wait(500)
    cy.get('#salarisMin').type('30')
    cy.wait(500)
    cy.get('#salarisMax').type('35')
    cy.wait(500)
    cy.get('#urenPerWeek').type('36')
    cy.wait(500)
    cy.get('#locatie').type('Amsterdam')
    cy.wait(500)
    cy.get('select#onsite').select('true').should('have.value', 'true')
    cy.wait(500)
    cy.get('#dateStart').type('2026-04-05')
    cy.wait(500)
    cy.get('#dateEnd').type('2027-04-05')
    cy.get('select#selectSkills').select('typescript')
    cy.wait(500)
    cy.get('select#selectTools').select('jira')
    cy.wait(500)
    cy.get('#submitBtn').click()
    cy.get('#successMessage')
        .should('contain.text', 'Je opdracht is opgeslagen')
    cy.wait(1500)
  });

  it('controleert of gebruiker een tool kan selecteren', () => {

    cy.get('#title').type('Project manager bij Tulipsoft')
    cy.wait(500)

    cy.get('#beschrijving').type('Werken bij tulipsoft als project manager')
    cy.wait(500)

    cy.get('select#selectTools')
        .select('jira')

    cy.wait(1000)

    cy.url().should('include', '/opdrachtplaatsen')
  })

  it('controleert of gebruiker een skill kan selecteren', () => {

    cy.get('select#selectSkills')
        .select('typescript')

    cy.get('select#selectSkills')
        .should('have.value', 'typescript')

    cy.wait(1000)
  })

  it('toont fout bij negatieve salariswaarde', () => {

    cy.get('#salarisMin').type('-1')
    cy.get('#salarisMax').type('-4')
    cy.get('#urenPerWeek').type('-2')

    cy.wait(3000)

    cy.get('#submitBtn').click()

    cy.wait(1000)

    cy.get('#negativeError')
        .should('contain.text', 'Waarde mag niet negatief zijn')
  })

  it('Verplichte velden niet ingevuld', () => {

    cy.get('#submitBtn').click()

    cy.get('#titleError')
        .should('contain.text', 'Dit veld is verplicht')
  })
})