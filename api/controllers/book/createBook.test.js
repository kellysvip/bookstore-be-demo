const request = require("supertest");
const fs = require("fs");
const app = require("../../../app");

describe("Books", () => {
  let books;
  beforeAll(() => {
    books = JSON.parse(fs.readFileSync("testdb.json", "utf-8")).books;
  });
  test("POST /books --> post a book", async () => {
    const { body } = await request(app)
      .post("/books")
      .send({
        author: "Life of Trl",
        country: "Viet Nam",
        imageLink: "images/wuthering-heights.jpg",
        language: "English",
        pages: 342,
        title: "Wuthering Heights",
        year: 1847,
        id: "d33430c6",
      })
      .expect(200);
    expect(body).toEqual({
      author: "Life of Trl",
      country: "Viet Nam",
      imageLink: "images/wuthering-heights.jpg",
      language: "English",
      pages: 342,
      title: "Wuthering Heights",
      year: 1847,
      id: expect.any(String),
    });
  });

  test("POST /books --> post a book fail", async () => {
    const { body } = await request(app)
      .post("/books")
      .send({
        country: "Viet Nam",
        imageLink: "images/wuthering-heights.jpg",
        language: "English",
        pages: 342,
        title: "Wuthering Heights",
        year: 1847,
        id: expect.any(String),
      })
      .expect(401);
    
  });
});
