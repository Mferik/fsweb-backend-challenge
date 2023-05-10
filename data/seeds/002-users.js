/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const userData = [
  {
    roleId:1,
    username:"Fatih",
    email:"mfatiherikk@gmail.com",
    birthday:"26/05/1998",
    password:"$2a$08$v.mdZdA3oP14YKOTArTA4ezXSnlaEqB1OKSudi1Y074MZvR3lF0kS"
  },
  {
    roleId:2,
    username:"Eylül",
    email:"eylül@gmail.com",
    birthday:"03/09/1999",
    password:"$2a$08$UwAUfrQ42k7djKkJ1n9Es.WV7iZKMcteevQTTpHaJ78BxzIl1d5Sa"
  },
  {
    roleId:2,
    username:"Ebrar",
    email:"ebrar@gmail.com",
    birthday:"11/06/2002",
    password:"$2a$08$UwAUfrQ42k7djKkJ1n9Es.WV7iZKMcteevQTTpHaJ78BxzIl1d5Sa"
  },
  {
    roleId:2,
    username:"Halenur",
    email:"halenur@gmail.com",
    birthday:"18/09/1992",
    password:"$2a$08$Ak/0TU4BHTzIRwza.fK9YukoGCRs4ms1u9VLPn.UmORM0p6tfSzb2"
  },
]

exports.userData=userData
exports.seed = async function(knex) {
 return await knex("Users").insert(userData)
};
