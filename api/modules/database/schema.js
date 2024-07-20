const sequelize = require("./connection");

// ----------------------------------------------------------
const cropImage_model = require("./models/cropImage.js");

// ----------------------------------------------------------

sequelize.define("cropImage",cropImage_model,{
    timestamps : false,
    freezeTableName : true
}).sync({ alter : true});

class DataBase {
    constructor() {
        this.models = sequelize.models;
    }
}

module.exports = DataBase;