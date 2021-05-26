import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PhotoPreviewModule } from '@components/photo-preview/photo-preview.module';
import { MaterialModule } from '../../shared/material.module';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    PhotoPreviewModule,
    ReactiveFormsModule,
    RouterModule.forChild(HomeRoutes),
  ],
  exports: [],
  declarations: [
    HomeComponent
 ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
