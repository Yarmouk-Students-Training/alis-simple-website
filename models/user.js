"use strict";
const { Model } = require("sequelize");
const reactions = require("./reactions");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ post, comment, reactions, friendship }) {
      this.hasMany(post);
      this.hasMany(comment);
      this.hasMany(reactions);
      this.belongsToMany(this, {
        through: friendship,
        as: "firstuser",
        foreignKey: "secounduser",
      });
    }
  }
  user.init(
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
      picture: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
