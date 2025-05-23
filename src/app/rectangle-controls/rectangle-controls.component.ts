import { Component, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-rectangle-controls',
  standalone: false,
  templateUrl: './rectangle-controls.component.html',
  styleUrl: './rectangle-controls.component.scss'
})
export class RectangleControlsComponent {
  @Input() selectedRectId: string | null = null;

  public fillRectangle = '#000000';
  public horizontalBorder = '0';
  public verticalBorder = '0';

  constructor(private renderer: Renderer2) { }

  ngOnChanges() {
    if (this.selectedRectId) {
      this.updateControlsFromElement();
      this.highlightSelectedElement();
    }
  }

  private updateControlsFromElement() {
    const element = document.getElementById(this.selectedRectId as string);
    if (element) {
      const rx = element.getAttribute('rx') || '0';
      const ry = element.getAttribute('ry') || '0';
      this.horizontalBorder = rx;
      this.verticalBorder = ry;
    }
  }

  private highlightSelectedElement() {
    const allRects = document.querySelectorAll('rect');
    allRects.forEach(rect => {
      this.renderer.setStyle(rect, 'stroke', null);
      this.renderer.setStyle(rect, 'stroke-width', null);
    });

    const element = document.getElementById(this.selectedRectId as string);
    if (element) {
      this.renderer.setStyle(element, 'cursor', 'pointer');
      this.renderer.setStyle(element, 'stroke', 'red');
      this.renderer.setStyle(element, 'stroke-width', '3');
    }
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
}
