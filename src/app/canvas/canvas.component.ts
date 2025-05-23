import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { Rectangle } from '../_interfaces/rectangle';
import { Svg } from '../_interfaces/svg';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  standalone: false,
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent {
  @ViewChild('canvasControl', { static: true }) canvasControl: ElementRef;
  @Input() canCreateElement: boolean = true;
  @Output() elementCreated = new EventEmitter<void>();
  @Output() canvasCleared = new EventEmitter<void>();
  @Output() rectangleSelected = new EventEmitter<string>();
  @Output() starSelected = new EventEmitter<string>();

  private defaultStarPoints = 5;
  private polygonCounter = 0;
  private rectCounter = 0;

  private rectProps: Rectangle[] = [
    { 'id': `element-${this.rectCounter++}` },
    { "height": "100" },
    { "width": "150" },
    { "x": "100" },
    { "y": "50" }
  ];

  private svgProps: Svg[] = [
    { "height": '200' },
    { "width": '300' },
    { "viewBox": '0 0 300 200' }
  ];

  constructor(private renderer: Renderer2) { }

  private generateStarPoints(centerX: number, centerY: number, points: number, outerRadius: number, innerRadius: number): string {
    let result = '';
    const angleStep = Math.PI / points;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * angleStep;

      const x = centerX + radius * Math.sin(angle);
      const y = centerY - radius * Math.cos(angle);

      result += `${x},${y} `;
    }

    return result.trim();
  }

  public clearCanvas() {
    let content = this.canvasControl.nativeElement;
    while (content.firstChild) {
      this.renderer.removeChild(content, content.firstChild);
    }
    this.canvasCleared.emit();
  }

  public createRectangle() {
    if (!this.canCreateElement) {
      return;
    }

    let content = this.canvasControl.nativeElement.querySelector('svg');
    content = this.renderer.createElement('svg', 'svg');

    this.svgProps.forEach(obj => {
      const key = Object.keys(obj)[0] as keyof Svg;
      const value = obj[key] as string;
      this.renderer.setAttribute(content, key, value);
    });

    this.renderer.appendChild(this.canvasControl.nativeElement, content);

    const rectId = `element-${this.rectCounter++}`;
    const rectangle = this.renderer.createElement('rect', 'svg');

    this.rectProps.forEach(obj => {
      const key = Object.keys(obj)[0] as keyof Rectangle;
      const value = obj[key] as string;
      this.renderer.setAttribute(rectangle, key, value);
    });

    this.renderer.setAttribute(rectangle, 'id', rectId);

    this.renderer.listen(rectangle, 'click', (event) => {
      event.stopPropagation();
      this.rectangleSelected.emit(rectId);
    });

    this.renderer.appendChild(content, rectangle);
    this.elementCreated.emit();
    this.rectangleSelected.emit(rectId);
  }

  public createStar(numPoints?: number) {
    if (!this.canCreateElement) {
      return;
    }

    const points = numPoints || this.defaultStarPoints;
    let content = this.canvasControl.nativeElement.querySelector('svg');
    content = this.renderer.createElement('svg', 'svg');

    this.svgProps.forEach(obj => {
      const key = Object.keys(obj)[0] as keyof Svg;
      const value = obj[key] as string;
      this.renderer.setAttribute(content, key, value);
    });

    this.renderer.appendChild(this.canvasControl.nativeElement, content);

    const polyId = `element-${this.polygonCounter++}`;
    const polygon = this.renderer.createElement('polygon', 'svg');
    this.renderer.setAttribute(polygon, 'id', polyId);

    const pointsStr = this.generateStarPoints(150, 150, points, 125, 50);
    this.renderer.setAttribute(polygon, 'points', pointsStr);
    this.renderer.setAttribute(polygon, 'transform', `scale(0.5)`);
    this.renderer.setAttribute(polygon, 'data-star-points', points.toString());

    this.renderer.listen(polygon, 'click', (event) => {
      event.stopPropagation();
      this.starSelected.emit(polyId);
    });

    this.renderer.appendChild(content, polygon);
    this.elementCreated.emit();
    this.starSelected.emit(polyId);
  }
}
