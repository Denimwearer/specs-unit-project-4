import { DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});
