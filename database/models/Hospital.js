const { DataTypes } = require("sequelize");
const sequelize = require("..");

const Hospital = sequelize.define(
    "hospital",
    {
        hospital_id:{
            type :  DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        hospital_name:{
            type : DataTypes.STRING,
        },
        hospital_location:{
            type : DataTypes.STRING,
        },
        
        hospital_phone:{
            type : DataTypes.STRING,
        },
    },
    {
        timestamps:false,
        freezeTableName:true,
        tableName:'hospital'
    }
);
module.exports = Hospital;
