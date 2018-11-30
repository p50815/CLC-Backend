'use strict'

const Sequelize = require('sequelize')
const dbConfigs = require('../../config/db').dbConfigs
const sequelizeConfig = require('../../config/db').sequelizeConfig

class SequelizeConnection {
    static getInst () {
        if (this.instance === undefined) {
            this.instance = new SequelizeConnection().initSequelize()
        }
        return this.instance
    }

    initSequelize () {
        console.log('SequelizeConnection init')
        let dbConfig = dbConfigs[sequelizeConfig.dialect]
        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
        // const Op = Sequelize.Op
        let sequelize = new Sequelize(
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            sequelizeConfig)
        return sequelize
    }
}
module.exports = SequelizeConnection
