// Connection

const ros = new ROSLIB.Ros({
    url: "ws://" + window.location.hostname + ":9090"
});

ros.on('connection', function () {
    console.log('Connected to websocket server.');
    document.getElementById('body').style.display = '';
});

ros.on('error', function (error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function () {
    console.log('Connection to websocket server closed.');
});


// Topics

const listener = new ROSLIB.Topic({
    ros: ros,
    name: '/mavros/statustext/recv',
    messageType: 'mavros_msgs/StatusText'
});
listener.subscribe(function (message) {
    if (message.text.includes('[cal]')) {
        console.log(message.text);
        if (message.text.includes('started')) {
            document.getElementById('progress').style.display = '';
            document.getElementById('progress').value = 0;
            document.getElementById('log').innerHTML += '<br>' + "Calibration started";
        }

        if (message.text.includes('calibration done')) {
            disableButtons(false);
            document.getElementById('log').innerHTML += '<br>' + "Calibration done";
            document.getElementById('progress').style.display = 'none';
        } else {
            disableButtons(true);
        }

        if (message.text.includes('progress')) {
            const re = /\d+/;
            document.getElementById('progress').style.display = '';
            document.getElementById('progress').value = parseInt(message.text.match(re).toString());
        }
        //document.getElementById('log').innerHTML += '<br>' + message.text;
    }
});

const state = new ROSLIB.Topic({
    ros: ros,
    name: '/mavros/state',
    messageType: 'mavros_msgs/State'
});
state.subscribe(function (message) {
    if (message.system_status !== 3) {
        disableButtons(true);
    } else {
        disableButtons(false);
    }
});


// Services

const mav_command = new ROSLIB.Service({
    ros: ros,
    name: '/mavros/cmd/command',
    serviceType: 'mavros_msgs/CommandLong'
});

function calib(request) {
    mav_command.callService(request, function (result) {
        console.log(result);
    }, function (result) {
        alert('error');
        console.log(result);
    });
}
