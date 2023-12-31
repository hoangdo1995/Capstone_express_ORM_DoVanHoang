import express from 'express';
import { getImageByUserId, getSaveImageByUserId, getUserInfo, login, signUp, storageImage, updateUser } from '../Controller/UserController.js';
import { getImageInforById } from '../Controller/ImageController.js';
const UserRoute = express.Router();

UserRoute.post('/sign-up',signUp);
UserRoute.post('/login',login);
UserRoute.post('/update',updateUser);
UserRoute.get('/info',getUserInfo);
UserRoute.post('/storage-image/:image_id',storageImage)
UserRoute.get('/image-save/:user_id',getSaveImageByUserId)
UserRoute.get('/image-create/:user_id',getImageByUserId)

export {UserRoute}