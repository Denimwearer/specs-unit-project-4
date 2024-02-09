import { DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  privateStatus: DataTypes.BOOLEAN,
});
