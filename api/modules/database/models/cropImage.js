const { DataTypes } = require("sequelize");

const slider = {
    image : {
        type : DataTypes.STRING(128),
        allowNull : false,
    },
}

module.exports = slider;
