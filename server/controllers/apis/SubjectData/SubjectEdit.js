'use strict'

const express = require('express')
const subjectListService = require('../../../services/SubjectData/SubjectList')
let router = express.Router()

router.get('/getCourseContent', async (req, res) => {
    let type = req.query.type
    let sid = req.query.sid
    let categoryId = req.query.categoryId

    if (type === '0') {
        sid = await subjectListService.getLastSidByCategory(categoryId)
    }

    let where = {
        SID: sid
    }
    let courseContent = await subjectListService.getCourseContentBySID(where)
    res.json(courseContent)
})

router.get('/getSDateItemByCategory', async (req, res) => {
    let categoryId = req.query.categoryId
    let courseContent = await subjectListService.getSDateItemByCategory(categoryId)
    res.json(courseContent)
})

module.exports = router
