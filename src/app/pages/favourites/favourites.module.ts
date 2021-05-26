import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PhotoPreviewModule } from '@components/photo-preview/photo-preview.module';
import { MaterialModule } from '../../shared/material.module';
import { FavouritesComponent } from './favourites.component';
import { FavouritesRoutes } from './favourites.routes';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    PhotoPreviewModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule.forChild(FavouritesRoutes),

  ],
  exports: [],
  declarations: [
    FavouritesComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FavouritesModule {
}
