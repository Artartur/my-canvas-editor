import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleControlsComponent } from './rectangle-controls.component';

describe('RectangleControlsComponent', () => {
  let component: RectangleControlsComponent;
  let fixture: ComponentFixture<RectangleControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RectangleControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RectangleControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
