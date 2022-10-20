const request = require("supertest");
const fs = require("fs");
const app = require("../../../app");
const { any } = require("joi");

describe("Books", () => {
  let books;
  beforeAll(() => {
    books = JSON.parse(fs.readFileSync("db.json", "utf-8")).books;
    console.log(books[books.length - 1]);
  });

  test("PUT /books --> update a book", async () => {
    const { body } = await request(app)
      .put(`/books/${books[books.length - 1].id}`)
      .send({
        author: "Life of Trl",
        country: "Viet Nam",
        imageLink: "images/wuthering-heights.jpg",
        language: "English",
        pages: 342,
        title: "Wuthering Heights",
        year: 1847,
      })
      .expect(200);
    console.log("body", body);

    expect(body).toEqual({
      author: "Life of Trl",
      country: "Viet Nam",
      imageLink: "images/wuthering-heights.jpg",
      language: "English",
      link: "https://en.wikipedia.org/wiki/Mahabharata\n",
      pages: 342,
      title: "Wuthering Heights",
      year: 1847,
      id: expect.any(String),
    });
  });

  // test("PUT /books --> update a book but less field", async () => {
  //   const { body } = await request(app).put(`/books/7B2414A6F497`).send({
  //     author: "Life of Trl",
  //     country: "Viet Nam",
  //     imageLink: "images/wuthering-heights.jpg"

  //   }).expect(200);

  //   expect(body).toEqual({
  //     "author": "Life of Trl",
  //     "country": "Viet Nam",
  //     "imageLink": "images/wuthering-heights.jpg",
  //     "language": "English",
  //     "link": "https://en.wikipedia.org/wiki/Mrs_Dalloway\n",
  //     "pages": 342,
  //     "title": "Wuthering Heights",
  //     "year": 1847,
  //     "id": "7B2414A6F497"
  //   });
  // });
});
