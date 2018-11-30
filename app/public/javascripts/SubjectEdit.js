var doman = 'http://127.0.0.1:3000/api/SubjectData/SubjectEdit/'

$(document).ready(function () {

    // http://localhost:3000/SubjectData/SubjectEdit.html?type=0&categoryId=C2&sid=4

    let categoryId = getUrlParameter('categoryId')
    let type = getUrlParameter('type')
    let sid = getUrlParameter('sid')

    let SDateItem =
        '<tr id="@@--@@" style="height: 40px;">                                                                                             ' +
        '<td style="width: 150px; background-color: rgb(204,204,204)">' +
        '<span class="SDateTitle" style="color:Black;font-weight:bold;"></span>' +
        ' <input class="isOpen" type="checkbox" name="ckbIsSub12" /> 有開課' +
        '</td>' +
        '<td style="background-color: rgb(239,239,239); text-align: center;">【<span class="SDateTitle"></span>】上課時間：' +
        '<input type="text" value="" class="date inputStyle" />' +
        '<br />' +
        '<select class="amOrPm inputStyle">' +
        '<option value="上午" selected="selected">上午</option>' +
        '<option value="下午">下午</option>' +
        '</select>' +
        '<input type="text" value="" class="time inputStyle" />' +
        '<br />' +
        '<br />' +
        '</td>' +
        '</tr>';

    let data = {
        categoryId: categoryId,
    }

    $.ajax({
        url: doman + 'getSDateItemByCategory',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function (data) {
            console.info(JSON.stringify(data))
            let SDateContent = ""
            if (data.status === 0) {
                for (let category of data.categories) {
                    let item = SDateItem.replace('@@--@@', category.value)
                    SDateContent += item
                }
                $('#regConditionRow').after(SDateContent)

                for (let category of data.categories) {
                    let selectId = '#' + category.value + ' '
                    $(selectId + '.SDateTitle').html(category.title)
                }
            }
        }
    })

    data = {
        type: type
    }
    if (type === '1')
        data.sid = sid
    else
        data.categoryId = categoryId

    $.ajax({
        url: doman + 'getCourseContent',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function (data) {
            console.info(JSON.stringify(data))
            if (data.status === 0) {
                let course = data.course
                let typeText = {
                    0: '新增',
                    1: '修改'
                }
                if (type === '0')
                    course.count = parseInt(course.count) + 1
                $('.title').html(typeText[type] + course.category + '課程')
                $('#year').val(course.year)
                $('#count').val(course.count)
                $('#regCondition').val(course.regCondition)
                $('#location').val(course.location)
                $('#regStartTime').val(course.regStartTime)
                $('#regEndTime').val(course.regEndTime)
                $('#memo').val(course.memo)


                for (let classItem of course.classes) {
                    let selectId = '#' + classItem.categoryId + ' '
                    $(selectId + '.date').val(classItem.date)
                    $(selectId + '.isOpen').prop('checked', classItem.isOpen)
                    $(selectId + '.amOrPm').val(classItem.amOrPm)
                    $(selectId + '.time').val(classItem.time)

                }
            }
        }
    })

    $('#btnSave').click(function () {
    })

    $('#btnCel').click(function () {
        let url = './SubjectList.html'
        // url += '?&categoryId=' + categoryId
        window.location.href = url;
    })

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
})