module.exports = function (io) {

    let users = {

    };

    io.on('connection', (socket) => {
        console.log('nuevo usuario conectado');
        
        socket.on('new user', (data,cb) => {
            if(data in users){
                cb(false);
            }else{
                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNickNames();            
            }
        });

        socket.on('send message', (data,cb) => {

            var msg = data.trim();

            if(msg.substr(0,3) === '/w '){
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if(index !== -1){
                    var name = msg.substring(0,index);
                    var msg = msg.substing(index+1);
                    if(name in users){ 
                        users[name].emit('whisper',{
                            msg,
                            nick:socket.nickname
                        });
                    }else {
                        cb('Error! Please enter a valid user');
                    }
                }else {
                    cb('Error! Please enter your message')
                }
            }else {
                io.sockets.emit('new message',{
                    msg:data,
                    nick:socket.nickname
                });
            }

        });

        socket.on('disconnect',data => {
            if(!socket.nickname) return;
            delete users[socket.nickname];
            //nicknames.splice(nicknames.indexOf(socket.nickname),1);
            updateNickNames();

        });

        function updateNickNames(){
            io.sockets.emit('usernames',Object.keys(users));
        }
    });
}