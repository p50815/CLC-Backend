var doman = 'http://127.0.0.1:3000/api/SubjectData/SubjectList/'

$(document).ready(function () {
    $.ajax({
        url: doman + 'getCategories',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.info(JSON.stringify(data))
            if (data.status === 0) {
                $('#courseSelect').html('')
                for (let category of data.categories) {
                    $('#courseSelect').append(new Option(category.title, category.value))
                }
                getSubjectListByCategory($('#courseSelect').val());
            }
        }
    })


    $('#gvSubject_btnAdd').click(function () {
        let categoryId = $('#courseSelect').val()
        console.log(categoryId)
        let url = './Subjectedit.html?type=0'
        url += '&categoryId=' + categoryId
        window.location.href = url;
    })

    $('#courseSelect').change(function () {
        getSubjectListByCategory($('#courseSelect').val());
    })
})

function getSubjectListByCategory(category) {
    let data = {
        'category': category
    }
    $.ajax({
        url: doman + 'getSubjectListByCategory',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function (data) {
            console.info(JSON.stringify(data))
            $('.gvSubjectItem').remove()
            for (i of data.courses) {
                $('#gvSubject').append(
                    '<tr class="gvSubjectItem">' +
                    '<td align="center" valign="middle">' +
                    '<span>' + i.status + '</span> ' +
                    '<input type="button" value="修改" class="gvSubject_btnEdit" id="' + i.id + '"/>' +
                    '</td>' +
                    '<td>' +
                    i.content +
                    '</td>' +
                    '<td>' + i.date + '</td>' +
                    '<td>' + i.time + '</td>' +
                    '<td>' +
                    i.regTime +
                    '</td>' +
                    '<td align="center" valign="middle">' +
                    '<input type="button" value="刪除" class="gvSubject_btnDel" id="' + i.id + '" />' +
                    '</td>' +
                    '</tr>')
            }

            $('.gvSubject_btnDel').click(function () {})

            $('.gvSubject_btnEdit').click(function () {
                // type=0&categoryId=C2&sid=4
                let url = './Subjectedit.html?type=1'
                let id = ($(this).attr('id')).split('_')
                url += '&categoryId=' + id[0].substring(0, 2)
                url += '&sid=' + id[1]
                window.location.href = url;
            })
        }
    })
}