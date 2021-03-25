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
      this.belongsTo(user);
      this.hasMany(comment);
      this.hasMany(reactions);
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
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID4,
      },
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
