import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const visionModel = db.define('vision', {
    name: DataTypes.STRING,
},{
    freezeTableName: true
});

export default visionModel;

(async()=>{
    await visionModel.sync();
})();