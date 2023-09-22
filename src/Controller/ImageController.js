import { errorCode, failCode, successCode } from "../config/ResponseCode.js";
import { models } from "../config/config.js";
import {Op} from 'sequelize';
import { getUserIdByToken } from "../Ultilities/ControllerUtil.js";

//api lấy toàn bộ hình
const getImages = async (req,res)=>{
    try {
        const data = await models.image.findAll();
        successCode(res,data,"Thành công!");
    } catch (error) {
        errorCode(res,{},`Đã xảy ra lỗi! ${error}`);
    }
}

//api lấy hình theo page có truyền vào req có chưa params: pageSize và page
const getImagesByPage = async(req,res)=>{
    try {
        const {pageSize, page} = req.params;
        const data = await models.image.findAll({
            limit:+pageSize,
            offset:(+page-1)*pageSize,
        });
        successCode(res,data,"Tải hình thành công!");
    } catch (error) {
        errorCode(res,{},`Đã xảy ra lỗi! ${error}`);
    }
}

//api tiềm kiếm hình ảnh theo tên 
const getImageByName = async(req,res)=>{
    try {
        const {nameSearch} =  req.params;
        const data = await models.image.findAll({
            where:{
                image_name:{
                    [Op.substring]: nameSearch,
                }
            }
        })
        successCode(res,data,'Tìm kiếm thành công!');
    } catch (error) {
        errorCode(res,{},`Đã xảy ra lỗi! ${error}`);
    }
}

const getImageInforById = async(req,res)=>{
    try {
        const {id} = req.params;
        //query
        const data = await models.image.findOne({
            include:{
                model:models.user,
                as:'user',
                attributes:{exclude:['password','email','user_id']}
            },
            where:{
                image_id:+id
            },
            attributes:{exclude:['user_id']}
        })
        //có hình ảnh
        if(data){
            successCode(res,data,"Lấy thông tin ảnh thành công!");
        }
        else{
            failCode(res,{id},401,'Id hình ảnh không tồn tại!');
        }
        
    } catch (error) {
        errorCode(res,{},`Đã xảy ra lỗi! ${error}`);
    }
}

//api kiểm tra trạng thái lưu hình ảnh
const CheckImageSaved = async(req,res)=>{
    try {
        //lấy các giá trị
        const {id} = req.params;
        const user_id = await getUserIdByToken(req);
        //kiểm tra
        const saved = await models.storage_image.findAll({
            where:{
                image_id:id,
                user_id
            }
        })
        if(saved.length > 0){
            //nếu đã lưu
            successCode(res,{saved:true,user_id,image_id:id},'Đã lưu hình ảnh!')
        }else{
            //nếu chưa lưu
            successCode(res,{saved:false,user_id,image_id:id},'Chưa lưu hình ảnh!')
        }
    } catch (error) {
        errorCode(res,{error},`Đã xãy ra lỗi! ${error}`)
    }
}

//api xóa hình ảnh theo id ảnh
const deleteImage = async(req,res)=>{
    try {
        const {image_id} = req.params;
        //kiểm tra sự tồn tại của ảnh
        const checkImage = await models.image.findAll({
            where:{image_id}
        })
        //lấy id người dùng
        const user_id = await getUserIdByToken(req);
        if(checkImage.length > 0){
            //nếu có ảnh có tồn tại
            await models.image.destroy({
            where:{image_id,user_id}
            })
            successCode(res,{image_id},"Xóa hình thành công!");
        }else{
            //nếu ảnh không có
            failCode(res,{image_id},401,'ID hình không tồn tại!')
        }
    } catch (error) {
        errorCode(res,{error},`Đã xãy ra lỗi! ${error}`)
    }
}

//cấu hình multer upload hình ảnh
import multer from 'multer'
import { resetFileName } from "../Ultilities/Util.js";
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,process.cwd()+'/public/img');
    },
    filename:async(req,file,callback)=>{
        const filename = new Date().getTime()+resetFileName(file.originalname);
        callback(null,filename);
    }
});
const upload = multer({storage});

//api upload hình ảnh
const uploadFile = (req,res,next)=>{
    upload.single('file')(req,res,async(err)=>{
        if(err){
            return  errorCode(res,{},`Đã có lối tải hình! ${err}`)
        }
        const file = req.file;
        //Lưu ảnh lên server
        const user_id = await getUserIdByToken(req);
        const {image_description} = req.body;
        const image_name = file.filename;
        const image_link = process.cwd()+'/public/img/' + file.filename;
        const newImage = {user_id,image_link,image_name,image_description}
        models.image.create(newImage);
        //gởi response về người dùng
        successCode(res,file,'Tải hình thành công!')
    })
}

export {getImages, getImagesByPage,getImageByName,getImageInforById, CheckImageSaved,deleteImage,uploadFile};