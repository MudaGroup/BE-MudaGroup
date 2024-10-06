import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const missionModel = db.define('mission', {
    name: DataTypes.STRING,
},{
    freezeTableName: true
});

export default missionModel;

(async()=>{
    await missionModel.sync();
})();