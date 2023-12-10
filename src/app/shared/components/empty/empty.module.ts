import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';

@NgModule({
  declarations: [
    EmptyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ //se utiliza para compartir componentes o modulos
    EmptyComponent
  ]
})
export class EmptyModule { }
