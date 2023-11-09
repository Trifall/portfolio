import { KawaseBlurFilter } from 'https://cdn.skypack.dev/@pixi/filter-kawase-blur@3.2.0';
import debounce from 'https://cdn.skypack.dev/debounce';
import hsl from 'https://cdn.skypack.dev/hsl-to-hex';
import * as PIXI from 'https://cdn.skypack.dev/pixi.js@5.x';
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@3.0.0';

console.log('run1');

// return a random number within a range
function random(min, max) {
	return Math.random() * (max - min) + min;
}

// map a number from 1 range to another
function map(n, start1, end1, start2, end2) {
	return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

// Create a new simplex noise instance
const simplex = new SimplexNoise();

// ColorPalette class
class ColorPalette {
	constructor() {
		this.setColors();
		this.setCustomProperties();
	}

	setColors() {
		// pick a random hue somewhere between 220 and 360
		this.hue = 360;
		this.complimentaryHue1 = this.hue + 30;
		this.complimentaryHue2 = this.hue + 60;
		// define a fixed saturation and lightness
		this.saturation = 100;
		this.lightness = 100;

		// define a base color
		this.baseColor = hsl(this.hue, this.saturation, this.lightness);
		// define a complimentary color, 30 degress away from the base
		this.complimentaryColor1 = hsl(this.complimentaryHue1, this.saturation, this.lightness);
		// define a second complimentary color, 60 degrees away from the base
		this.complimentaryColor2 = hsl(this.complimentaryHue2, this.saturation, this.lightness);

		// store the color choices in an array so that a random one can be picked later
		this.colorChoices = [this.baseColor, this.complimentaryColor1, this.complimentaryColor2];
	}

	blue() {
		return '0x4651c3';
	}

	pink() {
		return '0xd90166';
	}

	setCustomProperties() {
		// set CSS custom properties so that the colors defined here can be used throughout the UI
		document.documentElement.style.setProperty('--hue', this.hue);
		document.documentElement.style.setProperty('--hue-complimentary1', this.complimentaryHue1);
		document.documentElement.style.setProperty('--hue-complimentary2', this.complimentaryHue2);
	}
}

// Orb class
class Orb {
	// Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
	constructor(fill = 0x000000) {
		// bounds = the area an orb is "allowed" to move within
		this.bounds = this.setBounds();
		// initialise the orb's { x, y } values to a random point within it's bounds
		this.x = random(this.bounds['x'].min, this.bounds['x'].max);
		this.y = random(this.bounds['y'].min, this.bounds['y'].max);

		// how large the orb is vs it's original radius (this will modulate over time)
		this.scale = 1;

		// what color is the orb?
		this.fill = fill;

		// the original radius of the orb, set relative to window height
		this.radius = random(window.innerHeight / 2.5, window.innerHeight / 2.75);

		// starting points in "time" for the noise/self similar random values
		this.xOff = random(0, 1000);
		this.yOff = random(0, 1000);
		// how quickly the noise/self similar random values step through time
		this.inc = 0.002;

		// PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
		this.graphics = new PIXI.Graphics();
		this.graphics.alpha = 1;

		// 250ms after the last window resize event, recalculate orb positions.
		window.addEventListener(
			'resize',
			debounce(() => {
				this.bounds = this.setBounds();
			}, 250)
		);
	}

	getRadius() {
		return this.radius;
	}

	setBounds() {
		// how far from the { x, y } origin can each orb move
		const maxDistX = window.innerWidth / 1.8;
		const maxDistY = window.innerHeight / 1.8;
		// the { x, y } origin for each orb (the bottom right of the screen)
		const originX = window.innerWidth / 2;
		const originY = window.innerHeight / 2;

		// allow each orb to move x distance away from it's x / y origin
		return {
			x: {
				min: originX - maxDistX,
				max: originX + maxDistX,
			},
			y: {
				min: originY - maxDistY,
				max: originY + maxDistY,
			},
		};
	}

	update() {
		// self similar "psuedo-random" or noise values at a given point in "time"
		const xNoise = simplex.noise2D(this.xOff, this.xOff);
		const yNoise = simplex.noise2D(this.yOff, this.yOff);
		const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

		// map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
		this.x = map(xNoise, -1, 1, this.bounds['x'].min, this.bounds['x'].max);
		this.y = map(yNoise, -1, 1, this.bounds['y'].min, this.bounds['y'].max);
		// map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
		this.scale = map(scaleNoise, -1, 1, 0.75, 1.25);

		// step through "time"
		this.xOff += this.inc;
		this.yOff += this.inc;
	}

	render() {
		// update the PIXI.Graphics position and scale values
		this.graphics.x = this.x;
		this.graphics.y = this.y;
		this.graphics.scale.set(this.scale);

		// clear anything currently drawn to graphics
		this.graphics.clear();

		// tell graphics to fill any shapes drawn after this with the orb's fill color
		this.graphics.beginFill(this.fill);
		// draw a circle at { 0, 0 } with it's size set by this.radius
		this.graphics.drawCircle(0, 0, this.radius);
		// let graphics know we won't be filling in any more shapes
		this.graphics.endFill();
	}
}

// Create PixiJS app
const app = new PIXI.Application({
	// render to <canvas class="orb_canvas"></canvas>
	view: document.querySelector('.orb_canvas'),
	// auto adjust size to fit the current window
	resizeTo: window,
	// transparent background, we will be creating a gradient background later using CSS
	transparent: true,
});

app.stage.filters = [new KawaseBlurFilter(60, 10, true)];

const colorPalette = new ColorPalette();

// Create orbs
const orbs = [];

// for (let i = 0; i < 3; i++) {
// 	const orb = new Orb(colorPalette.randomColor());

// 	app.stage.addChild(orb.graphics);

// 	orbs.push(orb);
// }

const orb = new Orb(colorPalette.blue());
app.stage.addChild(orb.graphics);
orbs.push(orb);

const orb2 = new Orb(colorPalette.pink());
app.stage.addChild(orb2.graphics);
orbs.push(orb2);

// Animate!
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	app.ticker.add(() => {
		orbs.forEach((orb) => {
			orb.update();
			orb.render();
		});
	});
} else {
	orbs.forEach((orb) => {
		orb.update();
		orb.render();
	});
}

// document.querySelector('.overlay__btn--colors').addEventListener('click', () => {
// 	colorPalette.setColors();
// 	colorPalette.setCustomProperties();

// 	orbs.forEach((orb) => {
// 		orb.fill = colorPalette.randomColor();
// 	});
// });
