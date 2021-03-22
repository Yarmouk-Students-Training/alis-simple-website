"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  relationship.init(
    {
      user2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user1Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action_user_id: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "relationship",
    }
  );
  return relationship;
};
