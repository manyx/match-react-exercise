import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { PhotoPreviewComponent } from './photo-preview.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    OverlayModule
  ],
  declarations: [
    PhotoPreviewComponent
  ],
  exports: [
    PhotoPreviewComponent
  ],
  providers: []
})
export class PhotoPreviewModule {
}
