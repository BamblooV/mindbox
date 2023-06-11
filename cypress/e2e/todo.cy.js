describe('todoApp', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('displays three todo items by default', () => {
    cy.get('.todos__list li').should('have.length', 3);

    cy.get('.todos__list li p').eq(0).should('have.text', 'Hello');
    cy.get('.todos__list li p').eq(1).should('have.text', 'World');
    cy.get('.todos__list li').eq(1).get(".item__checkbox").should('be.checked')
    cy.get('.todos__list li p').eq(2).should('have.text', 'Walk the dog');

    cy.get('.counter').should('have.text', '2 items left');
  })

  it('can add new todo items', () => {
    const newItem = 'Feed the cat';

    cy.get('.todos__input').type(`${newItem}{enter}`);

    cy.get('.todos__list li p')
      .should('have.length', 4)
      .last()
      .should('have.text', newItem);

    cy.get('.counter').should('have.text', '3 items left');

    const newItem2 = 'Feed the dog';
    cy.get('.todos__input').type(`${newItem2}`);
    cy.get('.btn-plus').click();
    cy.get('.todos__list li p')
      .should('have.length', 5)
      .last()
      .should('have.text', newItem2);

    cy.get('.counter').should('have.text', '4 items left');
  })

  it('btn-plus should be disabled', () => {
    cy.get('.btn-plus').should('have.disabled');
  })

  it('btn-plus should not be disabled', () => {
    cy.get('.todos__input').type('Text');
    cy.get('.btn-plus').should('not.have.disabled');
  })

  it('can check off an item as completed', () => {
    cy.contains('Hello')
      .parent()
      .find('input[type=checkbox]')
      .check({ force: true }); //Для галочки используется псевдоэлемент, перекрывающий инпут

    cy.get('.counter').should('have.text', '1 items left');

    cy.contains('Hello')
      .parent()
      .get('li p')
      .should('have.css', 'text-decoration');
  })

  context('with a checked task', () => {
    beforeEach(() => {

      cy.contains('Hello')
        .parent()
        .find('input[type=checkbox]')
        .check({ force: true }); //Для галочки используется псевдоэлемент, перекрывающий инпут
    })

    it('can filter for uncompleted tasks', () => {
      cy.contains('Active').click()

      cy.get('.todos__list li p')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog');

      cy.get('.counter').should('have.text', '1 items left');

      cy.contains('Hello').should('not.exist');
      cy.contains('World').should('not.exist');
    })

    it('can filter for completed tasks', () => {
      cy.contains('Completed').click();

      cy.get('.todos__list li p')
        .should('have.length', 2)
        .first()
        .should('have.text', 'Hello');

      cy.get('.todos__list li p')
        .last()
        .should('have.text', 'World');

      cy.contains('Walk the dog').should('not.exist');
    })

    it('can delete all completed tasks', () => {
      cy.contains('Clear completed').click();

      cy.get('.todos__list li p')
        .should('have.length', 1)
        .should('have.text', 'Walk the dog');
    })
  })

  it('can delete the item', () => {
    cy.get('.todos__list li')
      .get('.btn-cross')
      .eq(1)
      .click();

    cy.get('.todos__list li').should('have.length', 2);

    cy.get('.counter').should('have.text', '2 items left');

    cy.get('.todos__list li')
      .get('.btn-cross')
      .eq(0)
      .click();

    cy.get('.todos__list li').should('have.length', 1);

    cy.get('.counter').should('have.text', '1 items left');
  })
})
