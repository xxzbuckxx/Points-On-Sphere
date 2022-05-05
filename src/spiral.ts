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


            // Fix Color
            const color_v = v.clone();
            color_v.x = Math.abs(color_v.x);
            color_v.y = Math.abs(color_v.y);
            color_v.z = Math.abs(color_v.z);

            let r = Math.floor(color_v.x*255).toString(16);
            let g = Math.floor(color_v.y*255).toString(16);
            let b = Math.floor(color_v.z*255).toString(16);
            while (r.length < 2) r = "0" + r;
            while (g.length < 2) g = "0" + g;
            while (b.length < 2) b = "0" + b;
            const color = `0x${r}${g}${b}`;
            this.spheres.children[i].material.color.setHex(color)

            // Set Positions
            v.multiplyScalar(this.radius);
            this.spheres.children[i].position.set(v.x, v.y, v.z);
        }

        this.updated = true;

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