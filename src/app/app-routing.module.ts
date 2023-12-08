import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { EnrollComponent } from './enroll/enroll.component';
import { EnrollTableComponent } from './enroll-table/enroll-table.component';
import { SequelizeComponent } from './sequelize/sequelize.component';
import { ChartsComponent } from './charts/charts.component';
import { ProductsComponent } from './e-site/products/products.component';
import { CartComponent } from './cart/cart.component';
import { ECommerceComponent } from './e-site/e-commerce/e-commerce.component';

import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from './auth/auth.guard';
import { TableComponent } from './table/table.component';




const routes: Routes = [
  {
    path:"", redirectTo:"/home",pathMatch:"full"
  },

  {
    path:"home",component:HomeComponent
  },
  {
    path:"events-table",component:EventsTableComponent 
  },
  {
    path:"enroll/:eventcode",component:EnrollComponent
  }, 
  {
    path:"profile",component:ProfileComponent
  },
 {
  path:"add-event",component:AddEventComponent,canActivate: [AuthGuard], data: { roles: ['admin'] } 
 },
 {
  path:"enroll-table",component:EnrollTableComponent,canActivate: [AuthGuard], data: { roles: ['admin']}
 },
 {
  path:"sequelize",component:SequelizeComponent
 },
 {
  path:"charts",component:ChartsComponent
 },
 {
  path:"table",component:TableComponent
 },
 {
  path:"cart",component:CartComponent
 },
//  {
//   path:"e-commerce1",component:ECommerceComponent
//  },
 {
  path:'orders',component:OrdersComponent
 },
 {
  path:'e-site',loadChildren:()=>import('./e-site/e-site.module').then(mod=>mod.ESiteModule),
 
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
