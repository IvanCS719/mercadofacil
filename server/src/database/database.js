import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('db_mercadofacil', 'mercad20', '', {
    host: 'localhost',
    dialect: 'mysql'
});