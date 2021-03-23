"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reactions extends Model {
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
  reactions.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reaction_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "reactions",
    }
  );
  return reactions;
};
