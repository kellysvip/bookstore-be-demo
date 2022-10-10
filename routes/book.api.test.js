const book = require("./book.api");
const request = require("supertest");

describe("Books", () => {
//   jest.setTimeout(30000);

  test("GET / --> get all books", async () => {
    const res = await request(book)
      .get("/books")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: expect.any(string),
        }),
      ])
    );
  });

  test("POST /books --> post a book", async () => {
    const res = await request(book).post("/books").send({
      author: "Life of Trl",
      country: "Viet Nam",
      imageLink: "images/wuthering-heights.jpg",
      language: "English",
      pages: 342,
      title: "Wuthering Heights",
      year: 1847,
      id: "d33430c6",
    });
    expect(res.body).toHaveProperty("author");
    expect(res.body).toHaveProperty("country");
  });

  test("PUT /books --> update a book", async () => {
    const res = await request(book).put(`/books/:bookId`).send({
      author: "Life of Trl",
      country: "Viet Nam",
      imageLink: "images/wuthering-heights.jpg",
      language: "English",
      pages: 342,
      title: "Wuthering Heights",
      year: 1847,
    });
    expect(res.body).toHaveProperty("author");
    expect(res.body).toHaveProperty("country");
    expect(200)
  });


});
