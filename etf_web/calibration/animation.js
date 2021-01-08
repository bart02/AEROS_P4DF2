const rots = {
    back: {
        x: Math.PI / 2,
        y: 0,
        z: 0,
    },
    up: {
        x: 0.3,
        y: 0,
        z: Math.PI,
    },
    right: {
        x: 0.3,
        y: -Math.PI / 2,
        z: -Math.PI / 2,
    },
    left: {
        x: 0.3,
        y: Math.PI / 2,
        z: Math.PI / 2,
    },
    front: {
        x: -Math.PI / 2,
        y: 0,
        z: Math.PI,
    },
    down: {
        x: 0.3,
        y: 0,
        z: 0,
    }
}

let modelApp = new Vue({
    el: '#model',
    data: {
        rotation: Object.assign({}, rots.down),
        speed: {
            x: 0, y: 0, z: 0,
        },
        rot: 0,
    },
    methods: {
        onLoad() {
        },
        rotate(newR) {
            const stages = 100;
            let oldR = this.rotation;
            this.speed = {
                x: (newR.x - oldR.x) / stages,
                y: (newR.y - oldR.y) / stages,
                z: (newR.z - oldR.z) / stages,
            }
            this.rot = stages;
            this.rotate();
        },
        rotate_once() {
            this.rotation.x += this.speed.x;
            this.rotation.y += this.speed.y;
            this.rotation.z += this.speed.z;
            if (this.rot > 0) {
                this.rot--;
                requestAnimationFrame(this.rotate_once);
            }
        }
    }
});