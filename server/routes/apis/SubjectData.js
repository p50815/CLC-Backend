'use strict'

const express = require('express')
const subjectListController = require('../../controllers/apis/SubjectData/SubjectList')
const subjectEditController = require('../../controllers/apis/SubjectData/SubjectEdit')

let router = express.Router()

router.use('/SubjectList', subjectListController)
router.use('/SubjectEdit', subjectEditController)

module.exports = router
