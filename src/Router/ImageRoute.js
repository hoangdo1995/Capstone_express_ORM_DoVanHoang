import express from 'express';
import { CheckImageSaved, deleteImage, getImageByName, getImageInforById, getImages, getImagesByPage, uploadFile } from '../Controller/ImageController.js';
import { middlewareAuth } from '../Ultilities/ControllerUtil.js';

const ImageRoute = express.Router();

ImageRoute.get('/getImages',getImages)
ImageRoute.get('/get-images-by-page/:pageSize/:page',getImagesByPage)
ImageRoute.get('/get-image-by-name/:nameSearch',getImageByName);
ImageRoute.get('/get-image-infor-by-id/:id',getImageInforById);
ImageRoute.get('/check-image-saved/:id',middlewareAuth,CheckImageSaved); 
ImageRoute.delete('/delete-image/:image_id',middlewareAuth,deleteImage)
ImageRoute.post('/upload',middlewareAuth,uploadFile);
export {ImageRoute};