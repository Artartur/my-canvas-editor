import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  selectElement(selectedId: string) {
    const allPolygons = document.querySelectorAll('polygon');
    const allRects = document.querySelectorAll('rect');

    [...allPolygons, ...allRects].forEach(element => {
      this.renderer.setStyle(element, 'stroke', null);
      this.renderer.setStyle(element, 'stroke-width', null);
    });

    const element = document.getElementById(selectedId);
    if (element) {
      this.renderer.setStyle(element, 'cursor', 'pointer');
      this.renderer.setStyle(element, 'stroke', 'red');
      this.renderer.setStyle(element, 'stroke-width', '3');
    }
  }
}
