import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModalComponent } from '@components/login-modal/login-modal.component';
import { MaterialModule } from '@shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    OverlayModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginModalComponent
  ],
  exports: [
    LoginModalComponent
  ],
  providers: []
})
export class LoginModalModule {
}
