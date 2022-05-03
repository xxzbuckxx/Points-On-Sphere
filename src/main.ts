import { World } from './world';
import { Spiral } from './spiral';

import './style.css'

let spiral: Spiral;
let world: World;

function Init() {
  world = new World();
  spiral = new Spiral(world.scene);
  spiral.makeGui();

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