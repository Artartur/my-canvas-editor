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

  public fillRectangle = '#000000';
  public horizontalBorder = '0';
  public verticalBorder = '0';

  constructor(private renderer: Renderer2, private selectService: SelectService) { }

  ngOnChanges() {
    if (this.selectedRectId) {
      this.updateControlsFromElement();
      this.selectedElement();
    }
  }

  private selectedElement() {
    this.selectService.selectElement(this.selectedRectId as string);
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
