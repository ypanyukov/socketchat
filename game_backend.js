var run = exports.run = function(app){
    if (!app)
        return false;
    
    chat(app);
};

var chat = function(app){
    var io = require('socket.io').listen(app);
    
    io.set('log level', 1);
    
    io.sockets.on('connection', function (socket) {
                
        socket.on('writeMessage', function(data){
           socket.broadcast.emit('writeMessage', data); 
        });
        
        socket.on('cancelWriteMessage', function(){
           socket.broadcast.emit('cancelWriteMessage'); 
        });
        
        socket.on('sendMessage', function(data){
           socket.emit('sendMessage', data); 
           socket.broadcast.emit('sendMessage', data); 
        });
    });
};