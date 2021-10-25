/// <reference types="cypress" />

describe("Job Portal e2e test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should render job form component", () => {
    cy.get("[data-testid='job-form']").within(() => {
      cy.get("label").contains("Title");
      cy.get("label").contains("Description");
      cy.get("label").contains("Skill 1");
      cy.get('input[name="title"]').should("be.visible");
      cy.get('input[name="skill"]').should("be.visible");
      cy.get('textarea[name="description"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible").contains("Add");
      cy.get('button[id="add_skill"]').should("be.visible");
    });
  });

  it("should render job board", () => {
    cy.get(".job-list").should("be.visible").contains("Job List");
  });

  it("should render top skills board", () => {
    cy.get(".top-skills-board")
      .should("be.visible")
      .contains("Most Used Skills");
  });

  it("should validate form", () => {
    cy.get('[data-testid="job-form"]').within(() => {
      cy.get('input[name="title"]').click().blur();
      cy.get('textarea[name="description"]').click().blur();
      cy.get(".Mui-error").contains("title is a required field");
      cy.get(".Mui-error").contains("description is a required field");
      cy.get('input[name="skill"]').type("django").type("{enter}");
      cy.get('button[id="add_skill"]').click();
      cy.get('[role="job-skill"]').contains("django");
      cy.get('input[name="skill"]').should("have.value", "");
    });
  });

  it("should submit form with valid fields", () => {
    cy.get('[data-testid="job-form"]').within(() => {
      cy.get('input[name="title"]').type("test job title");
      cy.get('textarea[name="description"]').type("test job description");
      cy.get('input[name="skill"]').type("react");
      cy.get('button[id="add_skill"]').click();

      cy.get('button[type="submit"]').click();
    });

    cy.get(".job-list").contains("test job title");
  });

  it("should display after clicking job", () => {
    cy.get(".job-list").within(() => {
      cy.get(".list-item").first().click();
    });

    cy.request("http://localhost:8000/api/jobs/").then((response) => {
      const jobs = response.body;

      cy.get(".job-detail")
        .contains(jobs[0].title)
        .contains(jobs[0].description)
        .contains(jobs[0].skills.map((skill) => skill.name).join(", "));
    });
  });
});
