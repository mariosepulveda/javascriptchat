$(function (){
    alert('works!!');

    const socket = io();

    // get DOM elements form interface

    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    // events 

    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message',$messageBox.val());
        $messageBox.val('');
        //console.log("enviando datos",$messageBox.val());
    });

    socket.on('new message', function (data){
        $chat.append(data+'<br/>')
    });

})