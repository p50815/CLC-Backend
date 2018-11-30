'use strict'

const express = require('express')
const subjectDataController = require('./SubjectData')

let router = express.Router()

router.use('/SubjectData', subjectDataController)

module.exports = router
