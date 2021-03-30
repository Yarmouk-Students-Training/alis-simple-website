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
      this.belongsTo(user, { foreignKey: "email" });
      this.belongsTo(post, { foreignKey: "post_id" });
    }
    toJSON() {
      return { ...this.get(), comment_id: undefined, post_id: undefined };
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
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post_id: {
        unique: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
    },

    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
