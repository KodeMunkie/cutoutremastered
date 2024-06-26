import { clampToInt, randomIntInclusive } from '../core/util';
import { toScanlines } from '../rasterizers/polygon';
import { Shape } from './Shape';
import { ShapeNameProps } from './ShapeNameProps';

export class Triangle extends Shape {

  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  private x3: number;
  private y3: number;

  constructor(xBound: number, yBound: number) {
    super(xBound, yBound);
    this.x1 = randomIntInclusive(0, xBound);
    this.y1 = randomIntInclusive(0, yBound);
    this.x2 = this.x1 + randomIntInclusive(-Triangle.MAX_SIZE, Triangle.MAX_SIZE);
    this.y2 = this.y1 + randomIntInclusive(-Triangle.MAX_SIZE, Triangle.MAX_SIZE);
    this.x3 = this.x1 + randomIntInclusive(-Triangle.MAX_SIZE, Triangle.MAX_SIZE);
    this.y3 = this.y1 + randomIntInclusive(-Triangle.MAX_SIZE, Triangle.MAX_SIZE);
  }

  set props([x1, y1, x2, y2, x3, y3]) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }

  get props(): number[] {
    return [this.x1, this.y1, this.x2, this.y2, this.x3, this.y3];
  }

  get svg(): ShapeNameProps {
    return {
      name: 'polygon',
      props: {
        points: `${this.x1},${this.y1} ${this.x2},${this.y2} ${this.x3},${this.y3}`
      }
    };
  }

  clone(): Shape {
    const triangle: Triangle = new Triangle(this.xBound, this.yBound);
    triangle.props = this.props;
    return triangle;
  }

  mutate(): void {
    switch (randomIntInclusive(0, 2)) {
      case 0:
        this.x1 = clampToInt(this.x1 + this.random(), 0, this.xBound);
        this.y1 = clampToInt(this.y1 + this.random(), 0, this.yBound);
        break;
      case 1:
        this.x2 = clampToInt(this.x2 + this.random(), 0, this.xBound);
        this.y2 = clampToInt(this.y2 + this.random(), 0, this.yBound);
        break;
      case 2:
        this.x3 = clampToInt(this.x3 + this.random(), 0, this.xBound);
        this.y3 = clampToInt(this.y3 + this.random(), 0, this.yBound);
    }
  }

  rasterize(): number[][] {
    const [x1, y1, x2, y2, x3, y3] = this.props;
    const vertices = [[x1, y1], [x2, y2], [x3, y3]];
    return toScanlines(vertices, this.xBound, this.yBound);
  }
}
