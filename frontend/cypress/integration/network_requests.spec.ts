/// <reference types="cypress" />

describe("Network Requests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("cy.request() - get job list", () => {
    cy.request("http://localhost:8000/api/jobs/").then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response).property("body").to.be.an("array");
    });
  });

  it("cy.request() - create job", () => {
    cy.request("POST", "http://localhost:8000/api/jobs/", {
      title: "Test job",
      description: "test job",
      skills: [],
    }).then((response) => {
      expect(response).property("status").to.equal(201);
      expect(response).property("body").to.contain({
        title: "Test job",
        description: "test job",
      });
      expect(response.body).property("id").to.be.a("number");
    });
  });

  it("cy.request() - create job and get job detail", () => {
    cy.request("POST", "http://localhost:8000/api/jobs/", {
      title: "Test job",
      description: "test job",
      skills: [],
    }).then((response) => {
      expect(response).property("status").to.equal(201);
      expect(response).property("body").to.contain({
        title: "Test job",
        description: "test job",
      });
      expect(response.body).property("id").to.be.a("number");

      cy.request(`http://localhost:8000/api/jobs/${response.body.id}/`).then(
        (res) => {
          expect(res).property("status").to.equal(200);
          expect(res).property("body").to.contain({
            title: "Test job",
            description: "test job",
          });
          expect(res.body)
            .property("id")
            .to.be.a("number")
            .equal(response.body.id);
        }
      );
    });
  });

  it("cy.request() - get top skills", () => {
    cy.request("http://localhost:8000/api/top-skills/").then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response).property("body").to.be.an("array");
    });
  });
});
