"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment, Reaction, relationship, User }) {
      // define association here
      this.hasMany(Post, { foreignKey: "userId" });
      this.hasMany(Comment, { foreignKey: "userId" });
      this.hasMany(Reaction, { foreignKey: "userId" });
      this.belongsToMany("User", {
        through: "relationship",
        as: "User",
        foreignKey: "user1Id",
      });
      this.belongsToMany("User", {
        through: "relationship",
        as: "User",
        foreignKey: "user2Id",
      });
    }
  }
  user.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
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
