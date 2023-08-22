/// <reference types="cypress" />

describe("This test case will show or return searched result after getting data it will change the page number to 2", () => {
  it("Search with name and change the page with page number", () => {
     
      cy.visit("/");
      cy.wait(1500); 
      cy.get("[name=search]").should("exist").type("o");
      cy.wait(2500); 
      cy.get("[name=searchBtn]").should("exist").click();
      cy.wait(1500);
      cy.get('[aria-label="Go to page 2"]').should("exist").click();
      cy.wait(1500);

  });
});
