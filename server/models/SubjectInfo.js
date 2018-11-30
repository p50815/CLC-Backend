const Sequelize = require('sequelize')
const SequelizeConnection = require('../db/sequelizeConnection')

let sequelize = SequelizeConnection.getInst()
let SubjectInfo = sequelize.define('SubjectInfo', {
    SID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CategoryID: {
        type: Sequelize.CHAR(100),
        primaryKey: true
    },
    SubCount: Sequelize.CHAR(100),
    SubName: Sequelize.CHAR(100),
    SUCondition: Sequelize.CHAR(600),
    SubLocation: Sequelize.CHAR(200),
    SubStrDate: Sequelize.DATE(3),
    SubEndDate: Sequelize.DATE(3),
    HtmlSubDesc: Sequelize.CHAR(-1),
    Memo: Sequelize.CHAR(-1),
    CreateTime: Sequelize.TIME(8)
}, {
    tableName: 'SubjectInfo',
    timestamps: false
})

module.exports = SubjectInfo
