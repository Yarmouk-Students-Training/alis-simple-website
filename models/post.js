"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, comment, reactions }) {
      this.belongsTo(user, { foreignKey: "email" });
      this.hasMany(comment, { foreignKey: "post_id" });
      this.hasMany(reactions, { foreignKey: "post_id" });
    }
  }
  post.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      post_id: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
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
