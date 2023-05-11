const db = require("../../data/db-config");

const getAllUsers = async () => {
  let users = await db("users").select("user_id", "username", "email");
  return users;
};

const getByFilter = async (filter) => {
  return db("users").where(filter).first();
};

const getById = async (user_id) => {
  return db("users")
    .select("user_id", "username")
    .where("user_id", user_id)
    .first();
};

const addUser = async (user) => {
  const [user_id] = await db("users").insert(user);
  return await getById(user_id);
};

const updateUser = async (user, user_id) => {
  await db("users").where("user_id", user_id).update(user);
  return getById(user_id);
};

const deleteUser = async (user_id) => {
  return db("users").where("user_id", user_id).delete();
};

module.exports = {
  getAllUsers,
  getByFilter,
  getById,
  addUser,
  deleteUser,
  updateUser,
};
