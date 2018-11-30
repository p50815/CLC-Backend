const Sequelize = require('sequelize')
const SequelizeConnection = require('../db/sequelizeConnection')

let sequelize = SequelizeConnection.getInst()
let SubjectDate = sequelize.define('SubjectDate', {
    SID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CategoryID: Sequelize.CHAR(100),
    SDate: Sequelize.DATE,
    SubTime: Sequelize.CHAR(40),
    SubTimeStr: Sequelize.CHAR(20),
    SubTimeEnd: Sequelize.CHAR(20)
}, {
    tableName: 'SubjectDate',
    timestamps: false
})

module.exports = SubjectDate
