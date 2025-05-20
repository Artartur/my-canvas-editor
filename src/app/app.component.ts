import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Svg } from './_interfaces/svg';
import { Rectangle } from './_interfaces/rectangle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('canvasControl', { static: true }) canvasControl: ElementRef;

  private selectedPolyId: string | null = null;
  private selectedRectId: string | null = null;

  private elementsCounter = 0;
  private maxElements = 3;
  private polygonCounter = 0;
  private rectCounter = 0;

  private rectProps: Rectangle[] = [{ 'id': `element-${this.rectCounter++}` }, { "height": "100" }, { "width": "150" }, { "x": "100" }, { "y": "50" }];
  private svgProps: Svg[] = [{ "height": '200' }, { "width": '300' }, { "viewBox": '0 0 300 200' }];

  public fillRectangle = '';
  public fillStar = '';
  public horizontalBorder = '0';
  public verticalBorder = '0';

  public starPoints = 5;

  public showRectangleControls = false;
  public showStarControls = false;

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

  private selectRectangle(id: string) {
    if (this.selectedRectId) {
      const prevRect = document.getElementById(this.selectedRectId);
      if (prevRect) {
        this.renderer.setStyle(prevRect, 'stroke', null);
        this.renderer.setStyle(prevRect, 'stroke-width', null);
      }
    }

    this.selectedRectId = id;

    const rect = document.getElementById(id);
    if (rect) {
      this.renderer.setStyle(rect, 'cursor', 'pointer');
      this.renderer.setStyle(rect, 'stroke', 'red');
      this.renderer.setStyle(rect, 'stroke-width', '3');

      const rx = rect.getAttribute('rx') || '0';
      const ry = rect.getAttribute('ry') || '0';
      this.horizontalBorder = rx;
      this.verticalBorder = ry;
    }

    this.showRectangleControls = true;
    this.showStarControls = false;
  }

  private selectStar(id: string) {
    if (this.selectedPolyId) {
      const prevPoly = document.getElementById(this.selectedPolyId);
      if (prevPoly) {
        this.renderer.setStyle(prevPoly, 'stroke', null);
        this.renderer.setStyle(prevPoly, 'stroke-width', null);
      }
    }

    this.selectedPolyId = id;

    const poly = document.getElementById(id);

    if (poly) {
      this.renderer.setStyle(poly, 'cursor', 'pointer');
      this.renderer.setStyle(poly, 'stroke', 'red');
      this.renderer.setStyle(poly, 'stroke-width', '3');
    }

    this.showRectangleControls = false;
    this.showStarControls = true;
  }

  public clearCanvas() {
    let content = this.canvasControl.nativeElement
    while (content.firstChild) {
      this.renderer.removeChild(content, content.firstChild)
    }

    this.fillRectangle = '#000000';
    this.fillStar = '#000000';
    this.showRectangleControls = false;
    this.showStarControls = false;
    this.elementsCounter = 0;
  }

  public createRectangle() {
    if (this.elementsCounter >= this.maxElements) {
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
      this.selectRectangle(rectId);
    });

    this.renderer.appendChild(content, rectangle);

    this.elementsCounter++;

    this.selectRectangle(rectId);
  }

  public createStar(numPoints?: number) {
    if (this.elementsCounter >= this.maxElements) {
      return;
    }

    const points = numPoints || this.starPoints;

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

    this.renderer.listen(polygon, 'click', (event) => {
      event.stopPropagation();
      this.selectStar(polyId);
    })

    this.renderer.appendChild(content, polygon);

    this.elementsCounter++;

    this.selectStar(polyId);
  }

  public editRectangleBorder() {
    if (!this.selectedRectId) return;

    const element = document.getElementById(this.selectedRectId);
    if (element) {
      this.renderer.setAttribute(element, 'rx', this.horizontalBorder);
      this.renderer.setAttribute(element, 'ry', this.verticalBorder);
    }
  }

  public editRectangleColor() {
    if (!this.selectedRectId) return;

    const element = document.getElementById(this.selectedRectId);
    if (element) {
      this.renderer.setAttribute(element, 'fill', this.fillRectangle);
    }
  }

  public editStarColor() {
    if (!this.selectedPolyId) return;

    const element = document.getElementById(this.selectedPolyId);
    if (element) {
      this.renderer.setAttribute(element, 'fill', this.fillStar);
    }
  }

  public editStarPoints(event: Event) {
    if (!this.selectedPolyId) return;

    const inputElement = event.target as HTMLInputElement;
    const points = +inputElement.value;

    const element = document.getElementById(this.selectedPolyId);

    if (element) {
      const newPoints = this.generateStarPoints(150, 150, points, 125, 50);
      this.renderer.setAttribute(element, 'points', newPoints);
      this.starPoints = points;
    }
  }
}
