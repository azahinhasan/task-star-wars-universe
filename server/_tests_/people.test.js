const { app } = require("../server.js");
const request = require("supertest");

describe("Test People Controller", () => {
  it("should return 200 response and fetch first 9 characters from json file", async () => {
    const res = await request(app).get("/api/people");
    expect(res.status).toBe(200);
    expect(res.body.totalDataFound).toBe(82);
    expect(res.body.success).toBe(true);
    expect(typeof res.body).toEqual("object");
  
  });

  it("should return 200 response and fetch specific matched data by name='Ackbar'", async () => {
    const res = await request(app).get("/api/people?name=Ackbar&page=");
    expect(res.status).toBe(200);
    expect(res.body.totalDataFound).toBe(1);
    expect(res.body.success).toBe(true);
    expect(res.body.characters[0].name).toBe("Ackbar");
    expect(res.body.characters[0].height).toBe("180");
    expect(typeof res.body).toEqual("object");
   
  });

  it("should return 200 response and fetch data of page='2'", async () => {
    const res = await request(app).get("/api/people?name=&page=2");
    expect(res.status).toBe(200);
    expect(res.body.totalDataFound).toBe(82);
    expect(res.body.totalPage).toBe(10);
    expect(res.body.success).toBe(true);
    expect(res.body.characters.length).toBe(9);
    expect(res.body.characters[0].name).toBe("Bib Fortuna");
    expect(res.body.characters[0].films[0].title).toBe("Return of the Jedi");
    expect(typeof res.body).toEqual("object");
    
  });


  it("should return 200 response and fetch matched data by name='c' and page='2", async () => {
    const res = await request(app).get("/api/people?name=c&page=2");
    expect(res.status).toBe(200);
    expect(res.body.totalDataFound).toBe(13);
    expect(res.body.totalPage).toBe(2);
    expect(res.body.success).toBe(true);
    expect(res.body.characters.length).toBe(4);
    expect(res.body.characters[0].name).toBe("Lando Calrissian");
    expect(typeof res.body).toEqual("object");
    
  });


  
});
