import { errorCode, failCode, successCode } from "../config/ResponseCode.js";
import { models } from "../config/config.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {checkId, getUserIdByToken } from "../Ultilities/ControllerUtil.js";


const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        //authentication
        //xác định sự tồn tại của email
        const checkEmail = await models.user.findOne({
            where:{
                email
            }
        })
        console.log(checkEmail);
        if(checkEmail){
            //nếu tồn tại
            //kiểm tra password
            const UserLogin = await models.user.findOne({
                where:{email}
            })
            bcrypt.compare(password,UserLogin.password,(err,result)=>{
                if(err){
                    console.log(err);
                    return
                }
                //đúng pass
                if(result){
                    //authorization
                    //gửi mã token
                    const token = jwt.sign({email},process.env.SECRET_KEY,{expiresIn:'1h'});
                    successCode(res,{email,password,token},"Đăng nhập thành công!");
                }
                else{
                    //sai pass
                    failCode(res,{email,password},401,"Sai mật khâu!");
                }
            })    
        }
        else{
            //nếu không tồn tại
            failCode(res,{email},401,"Email không tồn tại!");
        }
    } catch (error) {
        errorCode(res,{email,password},`Đã xảy ra lỗi! ${error}`)
    }
}

const signUp = async(req,res)=>{
    try {
        //kiểm tra trùng email
        const {full_name,email,password,age,avatar} = req.body;
        const checkEmail = await models.user.findAll({
            where:{
                email
            }
        })
        if(checkEmail.length > 0){
            //trùng email
            failCode(res,req.body,400,'Email bị trùng');
        }
        else{
            //Email hợp lệ
            const newUser = {full_name,email,password,age,avatar};
            await models.user.create(newUser);
            // mã hóa mật khẩu với bcrypt
            bcrypt.hash(password,10,async(err,hash)=>{
                if(err){
                    console.log(err);
                    return
                }
                console.log(hash);
                await models.user.update(
                    {password:hash},
                    {
                        where:{
                            email
                        }
                    })
            });
            successCode(res,newUser,'Tạo tài khoản thành công!');
        }
        //không trùng
        
    } catch (error) {
        errorCode(res,error,`Đã xảy ra lỗi!,${error}`);
    }
}

const getUserInfo = async(req,res)=>{
    try {
        const decode = await getUserIdByToken(req);
        const data = await models.user.findOne({
            where:decode.email,
            attributes:{exclude:"password"}
            }
        )
        successCode(res,data,'Lấy thông tin thành công!');
    } catch (error) {
        errorCode(res,error,`Đã xảy ra lỗi! ${error}`);
    }
}

const getSaveImageByUserId =  async(req,res)=>{
    try {
        const {user_id} = req.params;
        const checkIdUser = await checkId(user_id);
        if(checkIdUser){
            const data = await models.storage_image.findAll({
                where:{user_id}
            })
            successCode(res,data,"Lấy danh sách thành công!");
        }
        else{
            failCode(res,user_id,'Tìm kiếm thất bại!')
        }
        
    } catch (error) {
        errorCode(res,error,`Đã xảy ra lỗi! ${error}`);
    }
}

const getImageByUserId = async(req,res)=>{
    try {
        const {user_id} = req.params;
        const checkIdUser = await checkId(user_id);
        if(checkIdUser){
            const data = await models.image.findAll({
                where:{user_id},
                attributes:{exclude:'user_id'}
            })
            successCode(res,data,"Tải thành công!");
        }
        else{
            failCode(res,{error},401,'Id người dùng không đúng')
        }
    } catch (error) {
        errorCode(res,{error},`Đã xảy ra lỗi! ${error}`);
    }
}

export {login,signUp,getUserInfo,getSaveImageByUserId,getImageByUserId}