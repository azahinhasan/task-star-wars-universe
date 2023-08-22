/* eslint-disable no-undef */

describe("This test case will show data by pages", () => {
  it("Change data by page number", () => {
     
      cy.visit("/");
      cy.wait(1500); 
      cy.get('[aria-label="Go to page 2"]').should("exist").click();
      cy.wait(1500);
      cy.get('[aria-label="Go to page 3"]').should("exist").click();
      cy.wait(1500);

  });
});

