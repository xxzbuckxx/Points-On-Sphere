import * as THREE from 'three';
import dat from 'dat.gui';

//
// Spiral
//
export class Spiral {

    public numPoints: number;
    public radius: number;

    private spheres: THREE.Group;

    constructor(scene: THREE.Scene) {
        this.numPoints = 100;
        this.radius = 80;

        this.spheres = new THREE.Group;
        scene.add(this.spheres);
    }

    update() {
        // Update # of points
        while (this.numPoints > this.spheres.children.length) {
            this.spawnSphere()
        }

        while (this.numPoints < this.spheres.children.length) {
            this.spheres.remove(this.spheres.children[0])
        }

        // Sphere points calculated credit: Sebastion Lague
        // https://github.com/SebLague/Boids/blob/master/Assets/Scripts/BoidHelper.cs
        let goldenRatio = (1 + Math.sqrt(5)) / 2;
        let angleIncrement = Math.PI * 2 * goldenRatio;

        for (let i = 0; i < this.spheres.children.length; i++) {
            let t = i / this.numPoints;
            let inclination = Math.acos(1 - 2 * t);
            let azimuth = angleIncrement * i;

            let v = new THREE.Vector3();
            v.x = Math.sin(inclination) * Math.cos(azimuth);
            v.y = Math.sin(inclination) * Math.sin(azimuth);
            v.z = Math.cos(inclination);

            v.multiplyScalar(this.radius);

            this.spheres.children[i].position.set(v.x, v.y, v.z);
        }

    }


    private spawnSphere() {
        const geo = new THREE.SphereGeometry(1, 32, 16);
        const sphere = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());

        this.spheres.add(sphere);
    }

    public makeGui() {
        const gui = new dat.GUI();
        gui.add(this, "numPoints", 0, 1000);
    }

}