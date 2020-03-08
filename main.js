// main.js
//import log from './log';
//import { info } from './log';


// https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Classes
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  getRandomArbitrary() {
    let min = 1;
    let max = 9;
    this.b = Math.random() * (max - min) + min;
    this.h = Math.random() * (max - min) + min;
    return this;
  }

  static getArea(){
    return this.b * this.h;
  }
};

console.log(Polygon.getArea());
