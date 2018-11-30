
var dbDialect = 'mssql' // 'mysql'|'sqlite'|'postgres'|'mssql'

var dbConfigs = {
    mssql: {
        username: 'username',
        password: 'password',
        host: 'host',
        database: 'database',
        options: {}
    }
}

var sequelizeConfig = {
    dialect: dbDialect,
    dialectOptions: {
        encrypt: true
    },
    host: dbConfigs[dbDialect].host,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    operatorsAliases: false,
    logging: false
}

module.exports = {
    dbConfigs: dbConfigs,
    sequelizeConfig: sequelizeConfig
}
