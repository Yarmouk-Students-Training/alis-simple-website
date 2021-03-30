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
      this.belongsTo(user, { foreignKey: "email" });
      this.belongsTo(post, { foreignKey: "post_id" });
    }
  }
  reactions.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reaction_id: {
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
      post_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "reactions",
    }
  );
  return reactions;
};
