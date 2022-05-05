import { World } from './world';
import { Spiral } from './spiral';

import './style.css'

// Singletons
let spiral: Spiral;
let world: World;

function Init() {
  world = new World();
  spiral = new Spiral(world.scene);
}

function Animate() {
  world.update();
  spiral.update();

  requestAnimationFrame( Animate ); // loop
}

// Helper Functions -------------------------

window.addEventListener('DOMContentLoaded', async () => {
  Init();
  Animate();
});