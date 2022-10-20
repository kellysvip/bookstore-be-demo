
const request = require("supertest");
const fs = require("fs");
const app = require("../../../app");

describe("Books", () => {
  let books;
  beforeAll(() => {
    books = JSON.parse(fs.readFileSync("db.json", "utf-8")).books;
  });
  test("DELETE / --> delete a books", async () => {
    const { body } = await request(app).delete(`/books/${books[books.length-1].id}`).send({
    }).expect(200);

    expect(body).toEqual({
    });
  });
});
