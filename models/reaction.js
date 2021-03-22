"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Post, { foreignKey: "postId" });
    }
  }
  reaction.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "reaction",
    }
  );
  return reaction;
};
