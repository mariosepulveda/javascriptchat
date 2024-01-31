$(function (){

    const socket = io();

    // get DOM elements form interface

    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

     // get DOM elements form nickname form

     const $nickForm = $('#nickForm');
     const $nickname = $('#nickname');
     const $nickError = $('#nickError');
     const $users = $('#usernames');
    
     // events 


    $nickForm.submit( e => {
        e.preventDefault();

        socket.emit('new user',$nickname.val(), data => {
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                $nickError.html(`
                <div class="alert alert-danger">
                    that username already exists!!
                </div>`)
            }
            $nickname.val('');
        });

    });

    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message',$messageBox.val(),data => {
            $char.append(`<p class="error">${data}</p>`)
        });
        $messageBox.val('');
        //console.log("enviando datos",$messageBox.val());
    });

    socket.on('new message', function (data){
        $chat.append('<b>'+data.nick+'</b>: </br> '+data.msg+ '</br>')
    });

    socket.on('usernames',data => {
        let html = '';
        
        for(let i = 0; i<data.length;i++){
            html += `<p><i class="fas fa-user"></i>${data[i]}</>`
        }
        $users.html(html);
    });

    socket.on('whisper', data => {
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
    })

})