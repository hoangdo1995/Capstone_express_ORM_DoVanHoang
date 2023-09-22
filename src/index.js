import express from "express";
import cors from 'cors';
import { RootRoute } from "./Router/RootRoute.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors('*'));
app.use(express.static('public'));
app.listen(8080);
app.use('/api',RootRoute);