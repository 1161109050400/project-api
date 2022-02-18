const Sequelize = require('sequelize')
const sequelize = require("..");

const Insurances = sequelize.define(
    'insurances',
    {
        insurance_id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        insurance_name:{
            type:Sequelize.STRING
        },
        insurance_file:{
            type:Sequelize.STRING
        },
        type_insurance_id:{
            type: Sequelize.INTEGER
            
        },
        // type_insurance_name:{
        //     type:Sequelize.STRING
        // }

    },
    {
        timestamps:false,
        freezeTableName:true,
        tableName:'insurance'
    }

);
module.exports = Insurances;