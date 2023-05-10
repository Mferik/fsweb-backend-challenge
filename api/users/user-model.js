const db = require("../../data/db-config")

const getAllUsers = async () => {
    return await db("Users as u")
    .leftJoin("Roles as r", "r.roleId","u.roleId")
    .select("u.*","r.*")
}

const getUserById = async (userId) => {
    return await db("Users as u")
    .leftJoin("Roles as r","r.roleId","u.roleId")
    .select("u.*","r.*")
    .where({userId})
    .first()
}

const addUser = async (user) =>  {
    const [newUserId] = await db("Users").insert(user)
    return await getUserById(newUserId)
}

const updateUser = async (userId,user) => {
    return await db("Users").where({userId}).update(user)
}

const removeUser = async (userId) => {
    const removedUser = await db("Users").where({userId}).del()
    return getAllUsers()
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser
}