import { Spiral } from './spiral';
import * as dat from 'dat.gui';

import './style.css'

// Canvas Setup
const c = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = c.getContext("2d") as CanvasRenderingContext2D;

let dim = {w: window.innerWidth, h: window.innerHeight}
let spiral = new Spiral(ctx, dim);

function Init() {
  const gui = new dat.GUI();
  gui.add(spiral, "numPoints", 0, 1000);
  gui.add(spiral, "turnFraction", 0, 0.1);
}

function Animate() {
  resize();
  ctx.fillStyle = "pink";
  ctx.fillRect(0, 0, dim.w, dim.h);
  spiral.goldenSpiral();

  requestAnimationFrame( Animate ); // loop
}

// Helper Functions -------------------------

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  dim.w = window.innerWidth
  dim.h = window.innerHeight
}

window.addEventListener('DOMContentLoaded', async () => {
  Init();
  Animate();
});