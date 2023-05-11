const User = require("../api/users/users-model")
const db = require("../data/db-config")

test("env ayarları doğru mu", () => {
    expect(process.env.NODE_ENV).toBe("testing")
})

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()
})
beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()
})



describe("[1] addUser", () => {
    test("addUser ile yeni kullanıcı ekleme", async () => {
        const newUser = {
            username:"Muhittin",
            email:"excalibur.com",
            password:"1234"
        }
        const user = await User.addUser(newUser)
        const users = await db("users")
        expect(user).toBeDefined()
        expect(user).toEqual({user_id:4, username:"Muhittin"})
        expect(users).toHaveLength(4)
    })
})

describe("[2] getAllUsers", () => {
    test("getAllUsers ile tüm kullanıcılar dönüyor", async () => {
        const users = await User.getAllUsers()
        expect(users).toBeDefined()
        expect(users).toHaveLength(3)
    })
})

describe("[3] getById", () => {
    test("getById ile istenilen ıd'deki kullanıcı dönüyor", async () => {
        const user = await User.getById(1);
        expect(user).toBeDefined()
        expect(user).toEqual({
            user_id:1,
            username:"Fatih"
        })
    })
})

describe("[4] deleteUser", () => {
    test("deleteUser ile istenilen id'li kişi siliniyor", async () => {
      const userUpdate = await User.deleteUser(1);
      const users = await db("users");
      expect(userUpdate).toBeDefined();
      expect(users).toHaveLength(2);
    });
  });

  