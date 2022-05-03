
export class Spiral {

    public numPoints: number;
    public turnFraction: number;

    private ctx: CanvasRenderingContext2D;
    private dim: any;

    constructor(ctx: CanvasRenderingContext2D, dim: any) {
        this.numPoints = 10;
        this.turnFraction = 0;

        this.ctx = ctx;
        this.dim = dim;
    }

    drawPoint(x: number, y: number) {
        const ctx = this.ctx;

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
        ctx.fill();
    }


    goldenSpiral() {
        for (let i = 0; i < this.numPoints; i++) {
            const dst = i / (this.numPoints - 1) * (this.dim.w * 3 / 4);
            const angle = 2 * Math.PI * this.turnFraction * i;

            const x = dst * Math.cos(angle);
            const y = dst * Math.sin(angle);

            this.drawPoint(this.dim.w / 2 + x, this.dim.h / 2 + y);
        }
    }

}

