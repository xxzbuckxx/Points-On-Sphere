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
            const theta = Math.acos(1 - 2 * t);
            const phi = 2 * Math.PI * this.turnFraction * i;

            const v = new THREE.Vector3();
            v.x = this.radius * Math.sin(theta) * Math.cos(phi);
            v.y = this.radius * Math.sin(theta) * Math.sin(phi);
            v.z = this.radius * Math.cos(theta);

            this.spheres.children[i].position.set(v.x, v.y, v.z);
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