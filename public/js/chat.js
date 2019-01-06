// We get this from the above script tag;
let socket = io();

// Scroll to bottom function
scrollToBottom = function () {
    // Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');
    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

// 'connect' is a built in event
socket.on('connect', function () {
    const params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('No error!');
        }
    });
});

// Listening to custom event. Server is emiting it.
socket.on('newMessage', function (message) {
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        msg: message.msg,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

// Append a link for location sharing
socket.on('newLocationMessage', function (message) {
    const template = jQuery('#locMessage-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

// Listen to when users join a room or not
socket.on('updateUsersList', function (userList) {
    const ol = jQuery('<ol></ol>');
    userList.forEach((user) => {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server!');
});

// A jQuery function to submit form entries.
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        msg: jQuery('[name=message]').val()
    }, function () {
        jQuery('#message-value').val('');
    });
});

// Send location button
const sendLocButton = jQuery('#send-loc');
sendLocButton.on('click', function () {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by browser.');
    }

    sendLocButton.attr('disabled', 'disabled').text('Getting location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        sendLocButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        })
    }, function () {
        sendLocButton.removeAttr('disabled').text('Send location');
        alert('Unable to share location');
    })
});
