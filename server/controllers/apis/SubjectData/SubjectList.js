'use strict'

const express = require('express')
const subjectListService = require('../../../services/SubjectData/SubjectList')
let router = express.Router()

router.get('/getCategories', async (req, res) => {
    let categories = await subjectListService.getCategories()
    res.json(categories)
})

router.get('/getSubjectListByCategory', async (req, res) => {
    let categoryId = req.query.category
    let subjectList = await subjectListService.getSubjectListByCategory(categoryId)
    res.json(subjectList)
})

module.exports = router
