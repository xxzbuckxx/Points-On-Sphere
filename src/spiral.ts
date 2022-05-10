import * as THREE from 'three';
import dat from 'dat.gui';

//
// Generates points around a sphere
//
export class Spiral {

    public numPoints: number;
    public radius: number;

    private initIncrease: boolean;
    private spheres: THREE.Group;
    private updated: boolean;

    constructor(scene: THREE.Scene) {
        this.numPoints = 0;
        this.radius = 80;
        this.initIncrease = true;
        this.updated = false;

        this.spheres = new THREE.Group;
        scene.add(this.spheres);
    }

    update() {
        // Intro Transition
        if (this.initIncrease) {
            if (this.numPoints < 500) {
                this.numPoints++;
            } else {
                this.makeGui();
                this.initIncrease = false;
            }
        }

        // Update # of points
        while (this.numPoints > this.spheres.children.length) {
            this.spawnSphere()
            this.updated = false;
        }

        while (this.numPoints < this.spheres.children.length) {
            this.spheres.remove(this.spheres.children[0])
            this.updated = false;
        }

        if (this.updated) { // Don't update positions if no paramters have changed
            return;
        }

        // Sphere points calculated credit: Sebastion Lague
        // https://github.com/SebLague/Boids/blob/master/Assets/Scripts/BoidHelper.cs
        let goldenRatio = (1 + Math.sqrt(5)) / 2;
        let angleIncrement = Math.PI * 2 * goldenRatio;

        for (let i = 0; i < this.spheres.children.length; i++) {
            const t = i / this.numPoints;
            const inclination = Math.acos(1 - 2 * t);
            const azimuth = angleIncrement * i;

            const v = new THREE.Vector3();
            v.x = Math.sin(inclination) * Math.cos(azimuth);
            v.y = Math.sin(inclination) * Math.sin(azimuth);
            v.z = Math.cos(inclination);

            // Color
            const color = this.calculateColor(v);
            const mesh = this.spheres.children[i] as any;
            mesh.material.color.setHex(color)

            // Set Positions
            v.multiplyScalar(this.radius);
            this.spheres.children[i].position.set(v.x, v.y, v.z);
        }

        this.updated = true;

    }

    private calculateColor(v: THREE.Vector3): string {
            const xyz = [v.x, v.y, v.z]
            let out = '0x'
            xyz.forEach(n => {
                n = Math.abs(n);
                let h = Math.floor(n*255).toString(16); // scale to color range
                while (h.length < 2) h = "0" + h;       // pad zeros
                out += h;
            });

            return out
    }

    private spawnSphere() {
        const geo = new THREE.SphereGeometry(1, 32, 16);
        const sphere = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());

        this.spheres.add(sphere);
    }

    public makeGui() {
        const gui = new dat.GUI();
        gui.add(this, "numPoints", 0, 3000);
    }

}