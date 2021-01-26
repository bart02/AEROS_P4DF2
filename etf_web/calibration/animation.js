const rots = {
    back: {
        x: Math.PI / 2,
        y: 0,
        z: 0,
    },
    up: {
        x: Math.PI + 0.3,
        y: 0,
        z: 0,
    },
    right: {
        x: Math.PI / 2,
        y: -Math.PI / 2,
        z: 0,
    },
    left: {
        x: Math.PI / 2,
        y: Math.PI / 2,
        z: 0,
    },
    front: {
        x: Math.PI / 2,
        y: Math.PI,
        z: 0,
    },
    down: {
        x: 0.3,
        y: 0,
        z: 0,
    }
}

function piiiii(angle) {
    // if (angle > Math.PI *2) {
    //     return piiiii(angle - Math.PI *2)
    // } else if (angle < Math.PI * -2) {
    //     return piiiii(angle + Math.PI *2)
    // } else {
    //     if (angle > Math.PI){
    //         return angle - 2 * Math.PI;
    //     }
    //     else if (angle < -Math.PI){
    //         return angle + 2 * Math.PI;
    //     }
    //     else {
    //         return angle;
    //     }
    // }
    return angle;
}

let modelApp = new Vue({
    el: '#model',
    data: {
        rotation: Object.assign({}, rots.down),
        speed: {
            x: 0, y: 0, z: 0,
        },
        rot: 0,
        spinFlag: false,
    },
    methods: {
        onLoad() {
        },
        rotate(newR) {
            const stages = 100;
            this.spinFlag = false;
            let oldR = this.rotation;
            this.speed = {
                x: piiiii(newR.x - oldR.x) / stages,
                y: piiiii(newR.y - oldR.y) / stages,
                z: piiiii(newR.z - oldR.z) / stages,
            }
            console.log(piiiii(newR.x - oldR.x), piiiii(newR.y - oldR.y), piiiii(newR.z - oldR.z));
            this.rot = stages;
            this.rotate_once();
        },
        rotate_once() {
            this.rotation.x += this.speed.x;
            this.rotation.y += this.speed.y;
            this.rotation.z += this.speed.z;
            if (this.rot > 0) {
                this.rot--;
                requestAnimationFrame(this.rotate_once);
            }
        },
        sp(speed) {
            this.spinFlag = true;
            this.speed = speed;
            this.spin();
        },
        spin() {
            this.rotation.x += this.speed.x;
            this.rotation.y += this.speed.y;
            this.rotation.z += this.speed.z;
            if (this.spinFlag) {
                requestAnimationFrame(this.spin);
            }
        }
    }
});