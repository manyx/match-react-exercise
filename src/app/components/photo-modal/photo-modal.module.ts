import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PhotoPreviewModule } from '@components/photo-preview/photo-preview.module';
import { PhotoModalComponent } from '@components/photo-modal/photo-modal.component';
import { MaterialModule } from '@shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    OverlayModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    PhotoPreviewModule,
  ],
  declarations: [
    PhotoModalComponent
  ],
  exports: [
    PhotoModalComponent
  ],
  providers: []
})
export class PhotoModalModule {
}
