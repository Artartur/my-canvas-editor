import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private elementsCounter = 0;
  private maxElements = 3;

  public selectedRectId: string | null = null;
  public selectedPolyId: string | null = null;
  public showRectangleControls = false;
  public showStarControls = false;

  onElementCreated() {
    this.elementsCounter++;
  }

  onCanvasCleared() {
    this.elementsCounter = 0;
    this.selectedRectId = null;
    this.selectedPolyId = null;
    this.showRectangleControls = false;
    this.showStarControls = false;
  }

  onRectangleSelected(id: string) {
    this.selectedRectId = id;
    this.selectedPolyId = null;
    this.showRectangleControls = true;
    this.showStarControls = false;
  }

  onStarSelected(id: string) {
    this.selectedPolyId = id;
    this.selectedRectId = null;
    this.showRectangleControls = false;
    this.showStarControls = true;
  }

  canCreateNewElement(): boolean {
    return this.elementsCounter < this.maxElements;
  }
}
