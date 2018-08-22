import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import { HeaderComponent } from './header.component';
import { SearchFormComponent } from './search-form.component';
import { TableComponent } from './table.component';

const exportModule = [ FormsModule, CommonModule ];
const exportComponent = [ HeaderComponent, SearchFormComponent, TableComponent ];

@NgModule({
  imports: [ ...exportModule, MatToolbarModule, MatInputModule, MatButtonModule, MatSelectModule],
  declarations: [ ...exportComponent ],
  exports: [ ...exportComponent, ...exportModule ]
})
export class SharedModule { }
