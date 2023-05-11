const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});



afterAll(async () => {
  await db.destroy();
});

describe("Endpoint testleri", () => {
  describe("[GET] /", () => {
    test("[1] not found mesajı dönüyor", async () => {
      const res = await request(server).get("/");
      expect(res.body).toMatchObject({ message: "not found" });
      expect(res.status).toBe(404);
    });
  });
});

describe("[POST] /api/auth", () => {
  test("[2] kayıt olurken doğru status kodu dönüyor", async () => {
    const registeredUser = {
      username: "İrem",
      email: "eylül@eylül.com",
      password: "1234",
    };
    const res = await request(server)
      .post("/api/auth/register")
      .send(registeredUser);
    expect(res.status).toBe(201);
  });
  test("[3] kayıt olunca response olarak user_id ve username dönüyor", async () => {
    const registeredUser = {
      username: "İrem",
      email: "eylül@eylüls.com",
      password: "1234",
    };
    const res = await request(server)
      .post("/api/auth/register")
      .send(registeredUser);
    expect(res.body).toEqual({
      user_id: 4,
      username: "İrem",
    });
  });
  test("[4] login olunca doğru status kodu dönüyor", async () => {
      const login = {
        username: "Fatih",
        password: "1234",
      };
      const res = await request(server).post("/api/auth/login").send(login);
      expect(res.status).toBe(200);
    });
    test("[5] login olunca doğru mesajı dönüyor", async () => {
      const login = {
        username: "Fatih",
        password: "1234",
      };
      const res = await request(server).post("/api/auth/login").send(login);
      expect(res.body.message).toMatch(/merhabalar/i);
    });
    test("[6] login olurken name ve password  farklı ise doğru mesajı dönüyor", async () => {
      const login = {
        username: "MFE",
        password: "1234",
      };
      const res = await request(server).post("/api/auth/login").send(login);
      expect(res.body.message).toMatch(/geçersiz kriterler/i);
    });
});

  describe("[GET] /api/users", () => {
    test("[7] token var ve tüm userlar dönüyor", async () => {
      const login = {
        username: "Fatih",
        password: "1234",
      };
      let res = await request(server).post("/api/auth/login").send(login);
      res = await request(server)
        .get("/api/users")
        .set("Authorization", res.body.token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(4);
      expect(res.body[2]).toEqual({
        user_id: 3,
        username: "Hale",
        email: "hale@gmail.com",
      });
    });
  });
  describe("[DELETE] /api/users", () => {
    test("[8] istenilen id'li kullanıcı siliniyor ve doğru mesajı dönüyor", async () => {
      const login = {
        username: "Eylül",
        password: "1234",
      };
      let res = await request(server).post("/api/auth/login").send(login);
      res = await request(server)
        .delete("/api/users/1")
        .set("Authorization", res.body.token);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/id'li kullanıcı silindi/i);
    });
    
  });
  describe("[GET] /api/posts", () => {
    test("[9] tüm postlar dönüyor", async () => {
      const login = {
        name: "Fatih",
        password: "1234",
      };
      let res = await request(server).post("/api/auth/login").send(login);
      const authToken = res.body.token;
     let response = await request(server)
        .get("/api/posts")
        .set("Authorization", `Bearer ${authToken}`);
      expect(res.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });