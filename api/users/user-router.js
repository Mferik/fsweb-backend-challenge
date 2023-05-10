const router = require("express").Router()
const userModel = require("./user-model")
const userMd = require("./user-middleware")
const authMd = require("../auth/auth-middleware")

router.get("/", authMd.roleCheck, (req,res,next) => {
    try {
        const response = userModel.getAllUsers()
        res.status(200).json(response)
    } catch (error) {
        next({status:500, message:"database problem"})
    }
})

router.get("/:id", authMd.roleCheck,userMd.checkUserExist, async (req,res,next) => {
    try {
        const response = await userModel.getUserById(req.params.id);
        res.status(200).json(response)
    } catch (error) {
    next({
        status:500,
        message:"database problem"
    })        
    }
})

router.use((err, req, res, next) => {
    res.status(err.status).json({ message: err.message });
  });
  
  module.exports = router;