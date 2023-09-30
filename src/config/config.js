import initModels from "../Models/init-models.js";
import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('db_pinterest','root','1234',{
    host:'localhost',
    port:3306,
    dialect:'mysql'
})

const models = initModels(sequelize);

export  {models};