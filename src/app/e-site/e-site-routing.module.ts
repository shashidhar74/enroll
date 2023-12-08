import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component'
import * as path from 'path';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
const routes: Routes = [
  {path:'products',component:ProductsComponent},
  {path:'e-commerce',component:ECommerceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ESiteRoutingModule { }
