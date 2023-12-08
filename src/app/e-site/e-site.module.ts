import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ESiteRoutingModule } from './e-site-routing.module';

console.log('e-site module loaded');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ESiteRoutingModule
  ]
})
export class ESiteModule { }
