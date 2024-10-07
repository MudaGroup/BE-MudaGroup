import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const worshipPlaceModel = db.define('worship_place', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT, // TEXT tidak perlu batasan panjang seperti STRING
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    project_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    project_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default worshipPlaceModel;

(async () => {
    await worshipPlaceModel.sync();
})();
