function calibGyro() {
    calib(new ROSLIB.ServiceRequest({
        broadcast: false,
        command: 241,
        confirmation: 0,
        param1: 1,
        param2: 0,
        param3: 0,
        param4: 0,
        param5: 0,
        param6: 0,
        param7: 0
    }));
}

function calibAcc() {
    calib(new ROSLIB.ServiceRequest({
        broadcast: false,
        command: 241,
        confirmation: 0,
        param1: 0,
        param2: 0,
        param3: 0,
        param4: 0,
        param5: 1,
        param6: 0,
        param7: 0
    }));
}

function calibMag() {
    calib(new ROSLIB.ServiceRequest({
        broadcast: false,
        command: 241,
        confirmation: 0,
        param1: 0,
        param2: 1,
        param3: 0,
        param4: 0,
        param5: 0,
        param6: 0,
        param7: 0
    }));
}

function calibLevel() {
    calib(new ROSLIB.ServiceRequest({
        broadcast: false,
        command: 241,
        confirmation: 0,
        param1: 0,
        param2: 0,
        param3: 0,
        param4: 0,
        param5: 2,
        param6: 0,
        param7: 0
    }));
}