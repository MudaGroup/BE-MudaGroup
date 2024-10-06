import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const profileModel = db.define('profile', {
    name: {
        type: DataTypes.STRING(1000),
        allowNull: true // Kolom ini dapat bernilai null
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true // Kolom ini dapat bernilai null
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true // Kolom ini dapat bernilai null
    }
}, {
    freezeTableName: true
});

export default profileModel;

(async()=>{
    await profileModel.sync();
})();