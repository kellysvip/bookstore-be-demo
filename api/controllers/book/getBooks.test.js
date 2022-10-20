const request = require("supertest");
const fs = require("fs");
const app = require("../../../app");

describe("Books", () => {
  let books;
  beforeAll(() => {
    books = JSON.parse(fs.readFileSync("testdb.json", "utf-8")).books;
  });
  test("GET / --> get all books", async () => {
    const { body } = await request(app)
      .get("/books")
      .query({ author: "Jorge Luis Borges" })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body).toEqual([
      {
        author: "Jorge Luis Borges",
        country: "Argentina",
        imageLink: "images/ficciones.jpg",
        language: "Spanish",
        link: "https://en.wikipedia.org/wiki/Ficciones\n",
        pages: 224,
        title: "Ficciones",
        year: 1965,
        id: "CA9089453811",
      },
    ]);
  });

  test("GET / --> get books not found", async () => {
    const { body } = await request(app)
      .get("/books")
      .query({ author: "Hello" })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body).toEqual([]);
  });
});
