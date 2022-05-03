import * as THREE from 'three';
import dat from 'dat.gui';

//
// Spiral
//
export class Spiral {

    public numPoints: number;
    public turnFraction: number;
    public oscillate: boolean;
    public radius: number;

    private spheres: THREE.Group;
    private oscInc: boolean;

    constructor(scene: THREE.Scene) {
        this.numPoints = 100;
        this.turnFraction = 0;
        this.oscillate = true;
        this.oscInc = true;
        this.radius = 50;

        this.spheres = new THREE.Group;
        scene.add(this.spheres);
    }

    update() {
        // Oscilate turnFraction
        if (this.oscillate) {
            this.turnFraction += this.oscInc ? 0.0001 : -0.0001

            if (this.turnFraction <= 0) this.oscInc = true;
            else if (this.turnFraction > 0.1 ) this.oscInc = false;
        }

        // Update # of points
        while (this.numPoints > this.spheres.children.length) {
            this.spawnSphere()
        }

        while (this.numPoints < this.spheres.children.length) {
            this.spheres.remove(this.spheres.children[0])
        }

        // Update positions
        for (let i = 0; i < this.spheres.children.length; i++) {
            const t = i / (this.numPoints - 1);
            const inclination = Math.acos(1 - 2 * t);
            const azimuth = 2 * Math.PI * this.turnFraction * i;

            const x = this.radius * Math.sin(inclination) * Math.cos(azimuth);
            const y = this.radius * Math.sin(inclination) * Math.sin(azimuth);
            const z = this.radius * Math.cos(inclination) * Math.sin(azimuth);

            this.spheres.children[i].position.set(x, y, z);

        }
    }


    private spawnSphere() {
        const geo = new THREE.SphereGeometry(1, 32, 16);
        const sphere = new THREE.Mesh( geo, new THREE.MeshBasicMaterial() );

        this.spheres.add(sphere);
    }

    public makeGui() {
        const gui = new dat.GUI();
        gui.add(this, "numPoints", 0, 1000);
        gui.add(this, "turnFraction", 0, 0.1);
        gui.add(this, "oscillate", 0, 0.1);
    }

}