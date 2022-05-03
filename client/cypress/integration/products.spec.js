describe("Products", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("페이지 첫 접속 시 보이는 상품 갯수는 12개이다.", () => {
    cy.get("img").should("have.length", 12);
  });
  it("페이지를 스크롤하면 상품 갯수는 증가한다.", () => {
    cy.get("img").should("have.length", 12);
    cy.scrollTo("bottom");
    cy.wait(500);
    cy.get("img").should("have.length", 24);
  });
  it("product를 클릭하면 상세페이지로 이동한다.", () => {
    cy.get("img").first().click();
    cy.url().should("contains", "a1a9a197-904b-42f6-afae-ef568951abab");
  });
  it("검색을 입력하고 1초 후에 url이 변경되며 상품 갯수도 줄어든다.", () => {
    cy.get("input").type("test");
    cy.wait(1000);
    cy.url().should("include", "q=test");
    cy.get("img").should("have.length.lessThan", 12);
  });
  it("필터를 선택하면 url이 변경되며 상품 갯수도 줄어든다.", () => {
    cy.get("button").contains("place").click();
    cy.get("label").contains("강남").click();
    cy.get("button").contains("적용").click();
    cy.url().should("include", "place=");
    cy.get("img").should("have.length.lessThan", 12);
  });
  it("보기 방식을 변경하면 상품의 위치가 변경된다.", () => {
    cy.get("button").contains("리스트뷰").click();
    cy.get("a").first().parent().should("have.css", "display", "flex");
    cy.get("button").contains("그리드뷰").click();
    cy.get("a").first().parent().should("have.css", "display", "grid");
  });
});
