const { Model, DataTypes } = require('sequelize');

const LOGIN_TABLE = 'logins';

const LoginSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Login extends Model {
  static associate() {
    // model
  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: LOGIN_TABLE,
      modelName: 'Login',
      timestamps: false,
    };
  };
};

module.exports = { LOGIN_TABLE, LoginSchema, Login };
