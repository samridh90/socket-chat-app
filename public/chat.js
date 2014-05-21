window.onload = function() {
    var messages = [];
    var socket = io.connect('http://localhost:8000');
    var field = document.getElementById('field');
    var sendButton = document.getElementById('send');
    var content = document.getElementById('content');
    var name = document.getElementById('name');

    socket.on('message', function(data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br/>';
            }
            content.innerHTML = html;
        } else {
            console.log("There was a problem: ", data);
        }
    });
    $(document).ready(function() {
        $("#field").keyup(function(e) {
            if(e.keyCode == 13) {
                sendMessage();
            }
        });
    });

    sendButton.onclick = sendMessage = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            field.value = "";
            socket.emit('send', {message: text, username: name.value});
        }
    }
}
