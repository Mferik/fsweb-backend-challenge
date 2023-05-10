const userModel = require("./user-model")

const checkUserExist = async (req,res,next) => {
    try {
        const res = await userModel.getUserById(req.params.id);
        if(res){
            return res.status(200).json(res)
        } else {
            return next({
                status:404,
                message:`${req.params.id} ıd'sine sahip kullanıcı yoktur`
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {checkUserExist}