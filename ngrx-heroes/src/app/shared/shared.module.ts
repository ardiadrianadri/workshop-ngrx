import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [ CommonModule, FormsModule],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent, FormsModule, CommonModule ]
})
export class SharedModule { }
