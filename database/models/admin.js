const { DataTypes } = require("sequelize");
const sequelize = require("..");

const Admin = sequelize.define(
  "admin",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Admin;


// id: {type:sequelize.INTEGER, unique: true , allowNull: false, primaryKey: true,  autoIncrement: true},
// user_name: {type:sequelize.STRING, allowNull: false},
// password:{type:sequelize.STRING, allowNull: false},
// email:{type:sequelize.STRING, allowNull: false},