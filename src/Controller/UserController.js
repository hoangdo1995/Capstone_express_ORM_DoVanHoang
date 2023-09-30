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
        if(checkEmail){
            //nếu tồn tại
            //kiểm tra password
            const UserLogin = await models.user.findOne({
                attributes:['password','full_name'],
                where:{email}
            });
            const name = UserLogin.full_name;
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
                    successCode(res,{email,name,token},"Đăng nhập thành công!");
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
//hàm update thông tin người dùng
const updateUser = async(req,res)=>{
    try {
        //lấy dử liệu update
        const {full_name,avatar,age} = req.body;
        let userUpdate ={};
        if(full_name){
            userUpdate={...userUpdate,full_name:full_name};
        }
        if(avatar){
            userUpdate={...userUpdate,avatar:avatar};
        }
        if(age){
            userUpdate={...userUpdate,age:age};
        }
        //kiểm tra thông tin user_id
        const user_id = await getUserIdByToken(req);
        //thực hiện update
        await models.user.update(userUpdate,
            {
                where:
                {
                    user_id
                }
            })
            // trả về kết quả
        successCode(res,userUpdate,'Update thành công!');
        
    } catch (error) {
        //trả về lỗi
        errorCode(res,error,`Đã xảy ra lỗi! ${error}`);
    }
}

const getUserInfo = async(req,res)=>{
    try {
        const user_id = await getUserIdByToken(req);
        
        const data = await models.user.findOne({
            where:{
                user_id
            },
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

const storageImage = async(req,res)=>{
    try {
        const {image_id} = req.params;
        const user_id = await getUserIdByToken(req);
        await models.storage_image.create({user_id,image_id});
        successCode(res,{user_id,image_id},'Lưu hình ảnh thành công!')
    } catch (error) {
        errorCode(res,{error},`Đã xảy ra lỗi! ${error}`);
    }
} 

export {login,signUp,getUserInfo,getSaveImageByUserId,getImageByUserId,updateUser,storageImage}