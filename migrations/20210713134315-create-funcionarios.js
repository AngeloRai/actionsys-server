"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("funcionarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: {
          args: true,
          msg: "Email already exists!",
        },
      },
      data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: { msg: "Date must be in 'YYYY-MM-DD' format." },
        },
      },
      data_admissao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: { msg: "Date must be in 'YYYY-MM-DD' format." },
        },
      },
      setor: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cargo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nivel: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/angeloraimondi/image/upload/v1626280853/actionsys/file_ddpmuz.png"
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("funcionarios");
  },
};
