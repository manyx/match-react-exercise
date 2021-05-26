import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginModalModule } from '@components/login-modal/login-modal.module';
import { PhotoModalModule } from '@components/photo-modal/photo-modal.module';
import { MaterialModule } from '../shared/material.module';
import { MainNavComponent } from './main-nav/main-nav.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModalModule,
    PhotoModalModule
  ],
  declarations: [
    MainNavComponent
  ],
  exports: [
    MainNavComponent,
    LoginModalModule,
    PhotoModalModule,
    RouterModule
  ],
  providers: []
})
export class ComponentsModule {
}
