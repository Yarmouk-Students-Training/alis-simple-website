"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, post }) {
      this.belongsTo(user);
      this.belongsTo(post);
    }
  }
  comment.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      comment_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
