const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../config/config")
const { HASH_ROUNDS } = require("../../config/config");
const bcrypt = require("bcryptjs")
const UserModel = require("../users/users-model")


const restricted = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,JWT_SECRET,(err,decodedJWT) => {
            if(err){
                next({
                    status:401,
                    message:"Geçersiz token"
                })
            } else {
                req.userInfo = decodedJWT
                next()
            }
        })
    } else {
        next({
            status:401,
            message:"Token bulunamadı"
        })
    }
}

const payloadCheck = async (req,res,next) => {
    try {
        const {username,email,password} = req.body
        if(!username || !email || !password){
            res.status(400).json({message:"Tüm alanları doldurun lütfen"})
        } else {
            req.encPassword = await bcrypt.hashSync(req.body.password,HASH_ROUNDS)
            next()
        }
    } catch (error) {
        next(error)
    }
}

const usernameAndEmailUnique = async (req,res,next) => {
    try {
        const {username,email}= req.body
        let usernameControl = await UserModel.getByFilter({username:username})
        let emailControl = await UserModel.getByFilter({email:email})

        if(usernameControl){
            res.status(401).json({
                message:"Bu kullanıcı adı alınmış başka bir kullanıcı adı deneyin"
            })
        } else if (emailControl) {
            res.status(401).json({
                message:"Bu email adresi daha önce alınmış."
            })
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

const passwordCheck = async function (req, res, next) {
    try {
      let user = await UserModel.getByFilter({ username: req.body.username });
      if (!user) {
        next({
          status: 401,
          message: "geçersiz kriterler",
        });
      } else {
        const { password } = req.body;
        let correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
          next({
            status: 401,
            message: "geçersiz kriterler",
          });
        } else {
          req.user = user;
          next();
        }
      }
    } catch (error) {
      next(error);
    }
  };

  const payloadCheckLogin = async (req,res,next) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            res.status(400).json({
                message:"Tüm alanları doldurun"
            })
        } else {
            req.encPassword = await bcrypt.hashSync(req.body.password,HASH_ROUNDS)
            next()
        }
    } catch (error) {
        next(error)
    }
  }

  module.exports = {
    restricted,
    payloadCheck,
    usernameAndEmailUnique,
    passwordCheck,
    payloadCheckLogin,
  };
