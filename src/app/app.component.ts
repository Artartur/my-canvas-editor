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

  public rectCounter = 0;

  private svgProps: Svg[] = [{ "height": '200' }, { "width": '300' }, { "viewBox": '0 0 300 200' }];
  private rectProps: Rectangle[] = [{ 'id': `element-${this.rectCounter++}` }, { "height": "100" }, { "width": "150" }, { "x": "100" }, { "y": "50" }];

  public fillRectangle: string;
  public verticalBorder = '0';
  public selectedRectId: string | null = null;
  public horizontalBorder = '0';

  public elementsCounter = 0;
  public maxElements = 3;

  public showElementControls = false;

  constructor(private renderer: Renderer2) { }

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
      this.renderer.setStyle(rect, 'stroke', 'red');
      this.renderer.setStyle(rect, 'stroke-width', '3');

      const rx = rect.getAttribute('rx') || '0';
      const ry = rect.getAttribute('ry') || '0';
      this.horizontalBorder = rx;
      this.verticalBorder = ry;
    }

    this.showElementControls = true;
  }

  public clearCanvas() {
    let content = this.canvasControl.nativeElement
    while (content.firstChild) {
      this.renderer.removeChild(content, content.firstChild)
    }

    this.fillRectangle = '#000000';
    this.showElementControls = false;
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

  public editRectangleBorder() {
    if (!this.selectedRectId) return;

    const element = document.getElementById(this.selectedRectId);
    if (element) {
      this.renderer.setAttribute(element, 'rx', this.horizontalBorder);
      this.renderer.setAttribute(element, 'ry', this.verticalBorder);
    }
  }

  public changeRectangleColor() {
    if (!this.selectedRectId) return;

    const element = document.getElementById(this.selectedRectId);
    if (element) {
      this.renderer.setAttribute(element, 'fill', this.fillRectangle);
    }
  }

  public createStars() {
    if (this.elementsCounter >= this.maxElements) {
      return;
    }

    let content = this.canvasControl.nativeElement.querySelector('svg');

    if (!content) {
      content = this.renderer.createElement('svg', 'svg');
      this.renderer.setAttribute(content, 'width', '300');
      this.renderer.setAttribute(content, 'height', '300');
      this.renderer.setAttribute(content, 'viewBox', '0 0 300 300');
      this.renderer.appendChild(this.canvasControl.nativeElement, content);
    }

    const polygon = this.renderer.createElement('polygon', 'svg');

    this.renderer.setAttribute(polygon, 'points', '150,25 179,111 270,111 196,165 223,251 150,200 77,251 104,165 30,111 121,111');
    this.renderer.setAttribute(polygon, 'transform', `translate(${this.generateRandomPosition(300 - 75)},${this.generateRandomPosition(300 - 75)}) scale(0.5)`);
    this.renderer.appendChild(content, polygon);

    this.elementsCounter++;
  }
}
