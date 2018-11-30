'use strict'

var apiRouter = require('./apis/apis')

class routes {
    static init (app) {
        app.use('/api', apiRouter)
    }
}
module.exports = {
    init: routes.init
}
