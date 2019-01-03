// We get this from the above script tag;
let socket = io();

// 'connect' is a built in event
socket.on('connect', function () {
    console.log('Connected to server!');
});

// Listening to custom event. Server is emiting it.
socket.on('newMessage', function (message) {
    console.log(`New Message from ${message.from}: ${message.msg}`);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.msg}`);
    jQuery('#messages').append(li);
});

// Append a link for location sharing
socket.on('newLocationMessage', function (message) {
    console.log(message);
    console.log(`New Message from ${message.from}: ${message.url}`);
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    li.append(a);
    a.attr('href', message.url);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});

// A jQuery function to submit form entries.
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        msg: jQuery('[name=message]').val()
    }, function (data) {
        console.log(`This was sent from the server: ${data}`);
    });
    jQuery('#message-value').val('');
});

// Send location button
const sendLocButton = jQuery('#send-loc');
sendLocButton.on('click', function () {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            from: 'User',
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        })
    }, function () {
        alert('Unable to share location');
    })
});
