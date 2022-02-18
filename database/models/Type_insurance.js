const Sequelize = require('sequelize')
const sequelize = require("..");

const Type_insurance = sequelize.define(
    'type_insurance',
    {
        type_insurance_id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        type_insurance_name:{
            type:Sequelize.STRING
        }
        
    },
    {
        timestamps:false,
        freezeTableName:true,
        tableName:'type_insurance'
    }
);

module.exports = Type_insurance;