import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CanvasComponent } from './canvas/canvas.component';
import { RectangleControlsComponent } from './rectangle-controls/rectangle-controls.component';
import { StarControlsComponent } from './star-controls/star-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    RectangleControlsComponent,
    StarControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
