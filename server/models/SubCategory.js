const Sequelize = require('sequelize')
const SequelizeConnection = require('../db/sequelizeConnection')

let sequelize = SequelizeConnection.getInst()
let SubCategory = sequelize.define('SubCategory', {
    CategoryID: {
        type: Sequelize.CHAR(20),
        primaryKey: true
    },
    CategoryName: Sequelize.CHAR(40),
    IsInSubjectList: Sequelize.BOOLEAN,
    BelongsTo: Sequelize.CHAR(40)
}, {
    tableName: 'SubCategory',
    timestamps: false
})

module.exports = SubCategory
