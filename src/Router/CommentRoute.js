import express from 'express';
import { commentImage, getCommentByImageId } from '../Controller/CommentController.js';
import { middlewareAuth } from '../Ultilities/ControllerUtil.js';

const CommentRoute = express.Router();
CommentRoute.get('/get-comment-by-iamge-id/:id',getCommentByImageId);
CommentRoute.post('/comment-image',middlewareAuth,commentImage)
export {CommentRoute};