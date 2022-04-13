describe("example test", () => {
	it("test login", () => {
		cy.visit("http://localhost:3000/login");
		cy.get('input[name="email"]').type("dexter@test.com");
		cy.get('input[name="password"]').type("123123");
		cy.get("form button")
			.click()
			.then(() => {
				cy.contains("Datos");
			});
	});
});
