import { Component, Input, Renderer2 } from '@angular/core';
import { SelectService } from '../_services/select.service';

@Component({
  selector: 'app-rectangle-controls',
  standalone: false,
  templateUrl: './rectangle-controls.component.html',
  styleUrl: './rectangle-controls.component.scss'
})
export class RectangleControlsComponent {
  @Input() selectedRectId: string | null = null;

  private defaultFillRectangle = '#000000';
  private defaultHorizontalBorder = '0';
  private defaultStroke = '#000000';
  private defaultStrokeWidth = '5';
  private defaultVerticalBorder = '0';

  public fillRectangle = '#000000';
  public horizontalBorder = '0';
  public stroke = '#000000';
  public strokeWidth = '5';
  public verticalBorder = '0';

  constructor(private renderer: Renderer2, private selectService: SelectService) { }

  ngOnChanges() {
    if (this.selectedRectId) {
      this.getElementProperties();
      this.selectedElement();
    }
  }

  private getElementProperties() {
    const element = document.getElementById(this.selectedRectId as string);
    if (element) {
      const rx = element.getAttribute('rx') || '0';
      const ry = element.getAttribute('ry') || '0';
      this.horizontalBorder = rx;
      this.verticalBorder = ry;

      const fill = element.getAttribute('fill');
      this.fillRectangle = fill ? fill : this.defaultFillRectangle;

      const stroke = element.getAttribute('stroke');
      this.stroke = stroke ? stroke : this.defaultStroke;

      const strokeWidth = element.getAttribute('stroke-width');
      this.strokeWidth = strokeWidth ? strokeWidth : this.defaultStrokeWidth;
    }
  }

  private selectedElement() {
    this.selectService.selectElement(this.selectedRectId as string);
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

  public editRectangleStrokeColor() {
    if (!this.selectedRectId) return;

    const element = document.getElementById(this.selectedRectId);
    if (element) {
      this.renderer.setAttribute(element, 'stroke', this.stroke);
    }
  }

  public editRectangleStrokeWidth() {
    if (!this.selectedRectId) return;

    const element = document.getElementById(this.selectedRectId);
    if (element) {
      this.renderer.setAttribute(element, 'stroke-width', this.strokeWidth);
    }
  }
}
