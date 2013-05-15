$(document).ready(function(){
    var socket = io.connect('http://socket.yurypanyukov.c9.io/'),
        keys = {};
    
    socket.on('connect', function () {
        
        $('textarea.block-input').bind('keydown', function(e){
            if (!keys.pressed)
                keys.pressed = e.keyCode;
                
            socket.emit('writeMessage', {from: window.gct_nickname});
        });
        
        $('textarea.block-input').bind('keyup', function(e){
            if (keys.pressed === 17 && e.keyCode === 13 && $(this).val().length > 0){
                socket.emit('sendMessage', {message: $(this).val(), from: window.gct_nickname});
                $(this).val('');
            }
            keys = {};
        });
        
        $('textarea.block-input').bind('focusout', function(){
            socket.emit('cancelWriteMessage');
        });
        
        socket.on('writeMessage', function(data){
            $('div.block-write-message').fadeIn();
            $('div.block-write-message span.from').html(data.from + ', ');
        });
        
        socket.on('cancelWriteMessage', function(){
            $('div.block-write-message').fadeOut();
            $('div.block-write-message span.from').html('');
        });
        
        socket.on('sendMessage', function(data){
            $('div.block-log').append('<dl class="block-log-item">' +
                '<dt class="block-log-login">' + data.from + '</dt>' + 
                '<dd class="block-log-message">' + data.message + '</dd></dl>');
                
            $('.block-log').scrollTop($('.block-log').height());
        });

    });
});