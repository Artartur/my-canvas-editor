import { Component, Input, OnChanges, Renderer2 } from '@angular/core';
import { SelectService } from '../_services/select.service';

@Component({
  selector: 'app-star-controls',
  standalone: false,
  templateUrl: './star-controls.component.html',
  styleUrl: './star-controls.component.scss'
})
export class StarControlsComponent implements OnChanges {
  @Input() selectedPolyId: string | null = null;

  private defaultStarPoints = 5;

  public fillStar = '#000000';
  public stroke = '#000000';
  public strokeWidth = '5';

  public innerRadius: number = 50;
  public outerRadius: number = 125;
  public starPoints = 5;

  constructor(private renderer: Renderer2, private selectService: SelectService) { }

  ngOnChanges() {
    if (this.selectedPolyId) {
      this.updateControlsFromElement();
      this.selectedElement();
    }
  }

  private generateStarPoints(centerX: number, centerY: number, points: number): string {
    let result = '';
    const angleStep = Math.PI / points;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? this.outerRadius : this.innerRadius;
      const angle = i * angleStep;

      const x = centerX + radius * Math.sin(angle);
      const y = centerY - radius * Math.cos(angle);

      result += `${x},${y} `;
    }

    return result.trim();
  }

  private selectedElement() {
    this.selectService.selectElement(this.selectedPolyId as string);
  }

  private updateControlsFromElement() {
    const element = document.getElementById(this.selectedPolyId as string);
    if (element) {
      const pointsStr = element.getAttribute('data-star-points');
      this.starPoints = pointsStr ? parseInt(pointsStr) : this.defaultStarPoints;
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
      const newPoints = this.generateStarPoints(150, 150, points);
      this.renderer.setAttribute(element, 'points', newPoints);
      this.renderer.setAttribute(element, 'data-star-points', points.toString());
      this.starPoints = points;
    }
  }

  public editStarPointsLength(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.outerRadius = +inputElement.value;

    if (!this.selectedPolyId) return;

    const element = document.getElementById(this.selectedPolyId);
    if (element) {
      const currentPoints = +(element.getAttribute('data-star-points') || this.defaultStarPoints);
      const newPoints = this.generateStarPoints(150, 150, currentPoints);
      this.renderer.setAttribute(element, 'points', newPoints);
    }
  }

  public editStarStroke() {
    if (!this.selectedPolyId) return;

    const element = document.getElementById(this.selectedPolyId);
    if (element) {
      this.renderer.setAttribute(element, 'stroke', this.stroke);
    }
  }

  public editStarStrokeWidth() {
    if (!this.selectedPolyId) return;

    const element = document.getElementById(this.selectedPolyId);
    if (element) {
      this.renderer.setAttribute(element, 'stroke-width', this.strokeWidth);
    }
  }
}
