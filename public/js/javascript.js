let name = ''
const socket = io()

function uniCharCode(event) {
    var char = event.which || event.keyCode
    if (char === 13) {
        $('#bt').click();
    }
}

function sendMgs() {
    if ($('#inputChat').val()) {
        var data = {
            name,
            msg: $('#inputChat').val()
        }
        socket.emit('chatMessage', data)
        $('#inputChat').val('')
    }
}

socket.on('list', (list) => {
    const currentTime = new Date().toLocaleTimeString();
    if (list.name === name) {

        $('#content').append('<div class="col-xs-6 col-xs-offset-10" style="font-size: 8">' + currentTime + '</div>'
            + ' <div class="row">'
            + '<div class="col-xs-6 col-xs-offset-6">'
            + '<div class="alert alert-info" role="alert">' + list.msg + '</div>'
            + '</div>'
            + '</div>'
        )
    } else {
        $('#content').append(' <div class="row">'
            + '<div class="col-xs-1"><img src="../image/images.png" width="50" height="50"></div>'
            + '<div class="col-xs-6">'
            + '<div class="alert alert-success" role="alert">' + list.msg + '</div>'
            + '</div>'
            + '</div>'
        )
    }
    $('#content').scrollTop(100000000000000)
})

$(document).ready(() => {
    $('#login').show()
    $('#chat').hide()

    $('#register').click(() => {
        name = $('#name').val()
        if (name) {
            $('#name').val('')
            $('#user').append(name)

            $('#login').hide()
            $('#chat').show()
        }
    })
    $('#bt').click(() => {
        sendMgs()
    })
    $('#btResetChat').click(() => {
        $('#content').html('')
    })
})
