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

  private svgProps: Svg[] = [{ "height": '200' }, { "width": '300' }, { "viewBox": '0 0 300 200' }];
  private rectProps: Rectangle[] = [{ "x": "100" }, { "y": "50" }, { "height": "100" }, { "width": "150" }];

  public maxElements: number = 3;
  public elementsCounter: number = 0;

  constructor(private renderer: Renderer2) { }

  private generateRandomPosition(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public clearCanvas() {
    let content = this.canvasControl.nativeElement
    while (content.firstChild) {
      this.renderer.removeChild(content, content.firstChild)
    }

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

    const rectangle = this.renderer.createElement('rect', 'svg');

    this.rectProps.forEach(obj => {
      const key = Object.keys(obj)[0] as keyof Rectangle;
      const value = obj[key] as string;
      this.renderer.setAttribute(rectangle, key, value);
    });

    this.renderer.appendChild(content, rectangle);

    this.elementsCounter++;
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
