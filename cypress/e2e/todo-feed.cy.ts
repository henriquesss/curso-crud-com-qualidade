const BASE_URL = "http://localhost:3000";

describe("/ - Todos Feed", () => {
  it("when load, renders the page", () => {
    // Trailing slash = '/' at end of the url
    cy.visit(BASE_URL);
  });

  it.only("when create a new todo, it must be appears in the screen", () => {
    // 0 - Interception
    cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: "32c0371a-905f-414c-82f6-ddf28de473bc",
            date: "2023-12-31T12:44:23.252Z",
            content: "Test TODO",
            done: false,
          },
        },
      });
    }).as("createTodo");

    //1 - open page
    cy.visit(BASE_URL);
    //2 - select input of todo creation
    //3 - put a value in input of todo creation
    cy.get("input[name='add-todo']").type("Test TODO");
    //4 - search submit button of an todo and click
    cy.get("[aria-label='Adicionar novo item']").click();
    //5 - Check if a new element appears on the page
    cy.get("table > tbody >").contains("Test TODO");

    // Example of chaining
    // expect("text").to.be.equal("text");
  });
});
