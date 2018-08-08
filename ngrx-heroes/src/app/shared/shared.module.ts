import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';

import { HeaderComponent } from './header.component';


@NgModule({
  imports: [ CommonModule, FormsModule, MatToolbarModule],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent, FormsModule, CommonModule ]
})
export class SharedModule { }
