import { failCode, successCode,errorCode } from '../config/ResponseCode.js';
import {models} from '../config/config.js'
import { getUserIdByToken } from '../Ultilities/ControllerUtil.js';

const getCommentByImageId = async(req,res)=>{
    try {
        const {id} = req.params;
        //kiểm tra xự tồn tại của id image
        const checkImage = await models.image.findOne({
            where:{
                image_id:id
            }
        });
        //nếu image tồn tại
        if(checkImage){
            const data = await models.comment.findAll({
                where:{
                    image_id:id
                },
                include:{
                    model:models.user,
                    as:'user',
                    attributes:['full_name','avatar']
                }
            })
            successCode(res,data,'Thành công');
        }
        else{
            failCode(res,{id},401,'ID hình ảnh không tồn tại!');
        }
        
    } catch (error) {
        errorCode(res,{},`Đã xảy ra lỗi! ${error}`);
    }
}

//api comment image
const commentImage = async(req,res)=>{
    try {
        //lấy id user-comment

        const user_id = await getUserIdByToken(req,res);
        const {image_id,content} = req.body;
        const date = new Date();
        const newComment = {user_id,image_id,date,content};
        if(user_id){
            await models.comment.create(newComment);
            successCode(res,newComment,"Thành công!");
        }
        else{
            failCode(res,{user_id},401,'Người dùng không tồn tại!')
        }
    } catch (error) {
        errorCode(res,error,`Đã xảy ra lỗi! ${error}`);
    }
}

export {getCommentByImageId,commentImage};