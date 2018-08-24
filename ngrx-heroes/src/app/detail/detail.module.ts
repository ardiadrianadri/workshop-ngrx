import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './detail.router';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail.component';

@NgModule({
  imports: [ SharedModule, RouterModule.forChild(routes) ],
  exports: [],
  declarations: [DetailComponent],
  providers: [],
})
export class DetailModule { }
