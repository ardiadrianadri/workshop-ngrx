import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

import { SearchFormComponent } from './search-form.component';
import { TableComponent } from './table.component';
import { LoadingComponent } from './loading.component';
import { ErrorMsgComponent } from './error-msg.component';
import { CardComponent } from './card.component';

const exportModule = [ FormsModule, CommonModule ];
const exportComponent = [
  SearchFormComponent,
  TableComponent,
  LoadingComponent,
  ErrorMsgComponent,
  CardComponent
];

@NgModule({
  imports: [
    ...exportModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  declarations: [ ...exportComponent ],
  exports: [ ...exportComponent, ...exportModule ]
})
export class SharedModule { }
