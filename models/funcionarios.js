'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class funcionarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  funcionarios.init({
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: "Email already exists!",
      }
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "Date must be in 'YYYY-MM-DD' format." }
      }
    },
    data_admissao: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "Date must be in 'YYYY-MM-DD' format." }
      }
    },
    setor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cargo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nivel: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      defaultValue: "https://res.cloudinary.com/angeloraimondi/image/upload/v1626280853/actionsys/file_ddpmuz.png"
    }
  }, {
    sequelize,
    tableName: 'funcionarios',
    modelName: 'Funcionarios',
  });
  return funcionarios;
};