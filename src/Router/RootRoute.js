import express from 'express';
import { UserRoute } from './UserRoute.js';
import { ImageRoute } from './ImageRoute.js';
import { CommentRoute } from './CommentRoute.js';
import { middlewareAuth } from '../Ultilities/ControllerUtil.js';


const RootRoute = express.Router();
RootRoute.use('/user',UserRoute);
RootRoute.use('/image',ImageRoute);
RootRoute.use('/comment',middlewareAuth,CommentRoute);

export {RootRoute};