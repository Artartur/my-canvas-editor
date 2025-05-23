import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarControlsComponent } from './star-controls.component';

describe('StarControlsComponent', () => {
  let component: StarControlsComponent;
  let fixture: ComponentFixture<StarControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
