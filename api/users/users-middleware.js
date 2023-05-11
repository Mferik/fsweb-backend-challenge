const UserModel = require("./users-model")

const checkUserId = async (req,res,next) => {
    try {
        const isExist = await UserModel.getById(req.params.id);
        if(!isExist){
            res.status(400).json({message:"id yok"})
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

const checkUsername = async (req,res,next) => {
    try {
        const { username } = req.body
        let usernameControl = await UserModel.getByFilter({username:username})
        if(usernameControl){
            res.status(401).json({
                message:"Bu username daha önce alınmış,başka bir username deneyin"
            })
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkUsername,
    checkUserId
}