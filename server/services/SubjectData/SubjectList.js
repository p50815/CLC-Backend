'use strict'

const Sequelize = require('sequelize')
const Models = require('../../models/models')

class SubjectList {
    static async getCategories () {
        let result = {
            status: 0,
            categories: []
        }

        let where = {}
        where.IsInSubjectList = true
        let queryResult = await SubjectList.querySubCategoryTable(where)

        for (let row of queryResult) {
            let category = {}
            category.value = row.dataValues.CategoryID
            category.title = row.dataValues.CategoryName
            result.categories.push(category)
        }
        return result
    }

    static async getSubjectListByCategory (categoryId) {
        let result = {
            status: 0,
            courses: []
        }

        let where = {}
        where.CategoryID = categoryId
        let queryResult = await SubjectList.querySubjectTable(where)

        for (let row of queryResult) {
            let data = row.dataValues

            let regStartTime = data.SubStrDate
            let regEndTime = data.SubEndDate
            let finalClassTime = data.SubjectDate.SDate
            let now = new Date().toLocaleString().split(' ')[0]
            now = new Date(now)

            let year = data.SubCount.substring(0, 4)
            let count = data.SubCount.substring(4, 6)
            let categoryText = data.SubjectDate.SubCategory.CategoryName
            let startTime = SubjectList.dateFormat(regStartTime)
            let endTime = SubjectList.dateFormat(regEndTime)

            let course = {}
            if (regStartTime <= now && now <= regEndTime) {
                course.status = '課程已開始報名'
            } else if (now > finalClassTime) {
                course.status = '課程已結束'
            } else {
                course.status = '課程尚未開始'
            }
            course.id = data.SubjectDate.CategoryID + '_' + data.SubjectDate.SID
            course.content = year + '年第' + count + '次開 - ' + categoryText
            course.date = SubjectList.dateFormat(finalClassTime)
            course.time = data.SubjectDate.SubTime
            course.regTime = startTime + '~' + endTime
            result.courses.push(course)
        }
        return result
    }

    static async getSDateItemByCategory (categoryId) {
        let result = {
            status: 0,
            categories: []
        }

        let where = {}
        where.BelongsTo = categoryId
        let queryResult = await SubjectList.querySubCategoryTable(where)

        for (let row of queryResult) {
            let category = {}
            category.value = row.dataValues.CategoryID
            category.title = row.dataValues.CategoryName
            result.categories.push(category)
        }
        return result
    }

    static async getCourseContentBySID (where) {
        let queryResult = await SubjectList.querySubjectTable(where)
        let data = queryResult[0].dataValues

        let course = {}
        course.category = data.CategoryID
        course.type = '修改'
        course.year = data.SubCount.substring(0, 4)
        course.count = data.SubCount.substring(4, 6)
        course.regCondition = data.SUCondition
        course.classes = []
        course.location = data.SubLocation
        course.regStartTime = SubjectList.dateFormat(data.SubStrDate)
        course.regEndTime = SubjectList.dateFormat(data.SubEndDate)
        course.memo = data.Memo

        for (let row of queryResult) {
            let data = row.dataValues
            let timeArr = data.SubjectDate.SubTime.split(' ')
            let classItem = {}
            classItem.categoryId = data.SubjectDate.CategoryID
            classItem.title = data.SubjectDate.SubCategory.CategoryName
            classItem.isOpen = true
            classItem.date = SubjectList.dateFormat(data.SubjectDate.SDate)
            classItem.amOrPm = timeArr[0]
            classItem.time = timeArr[1]
            course.classes.push(classItem)
        }

        let result = {
            status: 0,
            course: course
        }
        return result
    }

    static async getLastSidByCategory (categoryId) {
        let queryResult = await Models.SubjectInfo.findOne({
            attributes: [
                [Sequelize.fn('max', Sequelize.col('SID')), 'max']
            ],
            where: {
                CategoryID: categoryId
            },
            order: [Sequelize.fn('max', Sequelize.col('SID'))]
        })
        return queryResult.dataValues.max
    }

    static async querySubCategoryTable (where) {
        let queryResult = await Models.SubCategory.findAll({
            attributes: ['CategoryID', 'CategoryName'],
            where: where
        })
        return queryResult
    }

    static async querySubjectTable (where) {
        Models.SubjectInfo.belongsTo(Models.SubjectDate, {
            foreignKey: 'SID'
        })

        Models.SubjectDate.belongsTo(Models.SubCategory, {
            foreignKey: 'CategoryID'
        })

        let queryResult = await Models.SubjectInfo.findAll({
            include: [{
                model: Models.SubjectDate,
                attributes: ['SID', 'SubTime', 'CategoryID', 'SDate'],
                include: [{
                    model: Models.SubCategory,
                    attributes: ['CategoryName']
                }]
            }],
            attributes: {
                exclude: ['SubName', 'HtmlSubDesc', 'CreateTime']
            },
            order: [
                [Models.SubjectDate, 'SID', 'DESC'],
                [Models.SubjectDate, 'SDate', 'ASC']
            ],
            where: where
        })
        return queryResult
    }

    static dateFormat (date) {
        return JSON.stringify(date).toString().split('T')[0].replace(/"/, '')
            .replace(/\..+/, '').replace(/-/, '/').replace(/-/, '/')
    }
}

module.exports = SubjectList
