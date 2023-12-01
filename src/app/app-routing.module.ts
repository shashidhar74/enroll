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
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { LocationComponent } from './location/location.component';
import { OrdersComponent } from './orders/orders.component';



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

//   {
//     path:"userdata",component:UserdataComponent,canActivate:[AuthGuard]
//   },
//   {
//     path:"dashboard",component:DashboardComponent,canActivate: [AuthGuard] 
//   }, 
  {
    path:"profile",component:ProfileComponent
  },
 {
  path:"add-event",component:AddEventComponent
 },
 {
  path:"enroll-table",component:EnrollTableComponent
 },
 {
  path:"sequelize",component:SequelizeComponent
 },
 {
  path:"charts",component:ChartsComponent
 },
 {
  path:"products",component:ProductsComponent
 },
 {
  path:"cart",component:CartComponent
 },
 {
  path:"e-commerce",component:ECommerceComponent
 },
 {
  path:"orders",component:OrdersComponent
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
