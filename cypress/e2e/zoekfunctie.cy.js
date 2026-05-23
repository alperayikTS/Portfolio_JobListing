describe('Zoekfunctie', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/zoekfunctie')
    cy.wait(2000)
  })

  it('toont correcte opdracht bij zoeken op titel', () => {

    cy.get('#zoekbalk')
        .should('be.visible')
        .type("Frontend Developer React")

    cy.wait(1000)

    cy.get('#zoekBtn')
        .should('be.visible')
        .click()

    cy.wait(2000)

    cy.get('#jobTitle')
        .should('contain.text', "Frontend Developer React")
  })

  it('toont correcte opdracht bij zoeken op beschrijving', () => {

    cy.get('#zoekbalk')
        .should('be.visible')
        .type('UI frameworks')

    cy.wait(1000)

    cy.get('#zoekBtn')
        .should('be.visible')
        .click()

    cy.wait(2000)

    cy.get('#jobDescription')
        .should('contain.text', 'UI frameworks')
  })

  it('toont melding wanneer geen resultaten gevonden zijn', () => {

    cy.get('#zoekbalk')
        .should('be.visible')
        .type('Project people')

    cy.wait(1000)

    cy.get('#zoekBtn')
        .should('be.visible')
        .click()

    cy.wait(2000)

    cy.get('#geenResultaten')
        .should('contain.text', 'Geen opdrachten gevonden')
  })

  it('filtert correct op remote opdrachten', () => {

    cy.get('#zoekbalk')
        .should('be.visible')
        .type('Front')

    cy.wait(1000)

    cy.get('#select')
        .select('true')
        .should('have.value', 'true')

    cy.wait(1000)

    cy.get('#zoekBtn')
        .click()

    cy.wait(2000)

    cy.get('#jobLocation')
        .should('contain.text', 'Remote')
  })

  it('filtert correct op onsite opdrachten', () => {

    cy.get('#zoekbalk')
        .should('be.visible')
        .type('Backend Developer Node.js')

    cy.wait(1000)

    cy.get('#select')
        .select('false')
        .should('have.value', 'false')

    cy.wait(1000)

    cy.get('#zoekBtn')
        .click()

    cy.wait(2000)

    cy.get('#jobLocation')
        .should('contain.text', 'Onsite')
  })
})