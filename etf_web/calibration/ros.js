// Connection

const ros = new ROSLIB.Ros({
    url: "ws://" + window.location.hostname + ":9090"
});

ros.on('connection', function () {
    console.log('Connected to websocket server.');
    calibrationApp.visible = true;
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
            calibrationApp.progressValue = 0;
            calibrationApp.log += '<br>' + "Calibration started";
        }

        if (message.text.includes('calibration done')) {
            calibrationApp.buttonsEnabled = true;
            calibrationApp.log += '<br>' + "Calibration done";
            calibrationApp.progressValue = -1;
            modelApp.rotate(rots.down);
        }

        if (message.text.includes('progress')) {
            calibrationApp.progressValue = parseInt(message.text.match(/\d+/).toString());
        }

        if (message.text.includes('pending: ')) {
            let storoni = message.text.split('pending: ')[1].split(' ');
            if (storoni.includes('down')) rotate(rots.down);
            else {
                modelApp.rotate(rots[storoni[0]]);
            }
            console.log(storoni)
        }
        //calibrationApp.log += '<br>' + message.text;
    }
});

const state = new ROSLIB.Topic({
    ros: ros,
    name: '/mavros/state',
    messageType: 'mavros_msgs/State'
});
state.subscribe(function (message) {
    calibrationApp.buttonsEnabled = (message.system_status === 3);
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
