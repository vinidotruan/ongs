import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './dialogs/error/error.component';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [],
})
export class SharedModule {}
