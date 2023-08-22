/// <reference types="cypress" />

describe("This test case will show or return searched result", () => {
  it("Search with name", () => {
     
      cy.visit("/");
      cy.get("[name=search]").should("exist").type("Grievous");
      cy.wait(1500);
      cy.get("[name=searchBtn]").should("exist").click();
      cy.wait(1500);

  });
});
