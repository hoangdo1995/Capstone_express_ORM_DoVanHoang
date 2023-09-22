import { errorCode, failCode } from "../config/ResponseCode.js";
import { models } from "../config/config.js";
import jwt from "jsonwebtoken";
const getUserIdByToken = async(req)=>{
    const {token} = req.headers;
    const decode = jwt.decode(token,process.env.SECRET_KEY);
    const user = await models.user.findOne({
        where:{
            email:decode.email
        }
    })
    return user.user_id;    
}

const middlewareAuth = (req,res,next)=>{
    //authorization
    const {token} = req.headers;
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err){
            failCode(res,err,403,'Không đủ quyền!');
        }
        else{
            next();
        }
    })
}

const checkId = async(user_id)=>{
    const data = await models.user.findAll({
        where:{user_id}
    })
    if(data.length > 0){
        return true;
    }
    else{
        false
    }
}

export {getUserIdByToken,middlewareAuth,checkId};