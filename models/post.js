"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment, Reaction }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.hasMany(Comment, { foreignKey: "postId" });
      this.hasMany(Reaction, { foreignKey: "postId" });
    }
  }
  post.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
