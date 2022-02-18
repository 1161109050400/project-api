const { DataTypes } = require("sequelize");
const sequelize = require("..");

const User = sequelize.define(
    "user",
    {
        user_id:{
            type : DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        user_firstname:{
            type : DataTypes.STRING,
        },
        user_lastname:{
            type : DataTypes.STRING,
        },
        user_email:{
            type : DataTypes.STRING,
            unique : true,
        },
        user_phone:{
            type : DataTypes.STRING
        },
        user_fax:{
            type : DataTypes.STRING,
        },
        user_county:{
            type : DataTypes.STRING,
        }
    },
    {
        // timestamps:false,
        freezeTableName:true,
        tableName:'user'
    }
);

module.exports = User;