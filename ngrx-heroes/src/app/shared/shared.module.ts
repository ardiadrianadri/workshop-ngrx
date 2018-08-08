import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { HeaderComponent } from './header.component';
import { SearchFormComponent } from './search-form.component';

const exportModule = [ FormsModule, CommonModule ];
const exportComponent = [ HeaderComponent, SearchFormComponent ];

@NgModule({
  imports: [ ...exportModule, MatToolbarModule, MatInputModule, MatButtonModule],
  declarations: [ ...exportComponent ],
  exports: [ ...exportComponent, ...exportModule ]
})
export class SharedModule { }
