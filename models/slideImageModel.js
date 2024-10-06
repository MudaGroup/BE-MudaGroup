import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes} = Sequelize;

const slideImageModel = db.define('slide_image', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    freezeTableName: true
});

export default slideImageModel;

(async()=>{
    await slideImageModel.sync();
})();