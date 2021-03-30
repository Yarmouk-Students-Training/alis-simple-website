"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ post, comment, reactions, friendship }) {
      this.hasMany(post, { foreignKey: "email" });
      this.hasMany(comment, { foreignKey: "email" });
      this.hasMany(reactions, { foreignKey: "email" });
      this.belongsToMany(this, {
        through: friendship,
        as: "firstuser",
        foreignKey: "secounduser",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      gender: {
        allowNull: false,
        type: DataTypes.ENUM("female", "male"),
      },
      picture: {
        type: DataTypes.BLOB,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return User;
};
