import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { KeycloakAngularModule,KeycloakService } from 'keycloak-angular';
import { UserdetailsService } from './userdetails.service';
import { initializeKeycloak } from './keycloak_util/key_init';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateEventComponent } from './update-event/update-event.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { EnrollComponent } from './enroll/enroll.component';
import { EnrollTableComponent } from './enroll-table/enroll-table.component';
import { SequelizeComponent } from './sequelize/sequelize.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ChartsComponent } from './charts/charts.component';
import { NgChartsModule } from 'ng2-charts';
import { ProductsComponent } from './e-site/products/products.component';
import { CartComponent } from './cart/cart.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ECommerceComponent } from './e-site/e-commerce/e-commerce.component';
import { QRCodeModule } from 'angularx-qrcode';
import {MatStepperModule} from '@angular/material/stepper';
import {MatBadgeModule} from '@angular/material/badge';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrdersComponent } from './orders/orders.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth/auth.guard';
import { NgOptimizedImage } from '@angular/common'
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HomeComponent,
    ProfileComponent,
    AddEventComponent,
    EventsTableComponent,
    UpdateEventComponent,
    EnrollComponent,
    EnrollTableComponent,
    SequelizeComponent,
    ChartsComponent,
    ProductsComponent,
    CartComponent,
    ECommerceComponent,
    FilterPipe,
    InvoiceComponent,
    OrdersComponent,
    FooterComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    MatDialogModule,
    MatExpansionModule,
    NgChartsModule,
    MatTabsModule,
    QRCodeModule,
    MatStepperModule,
    MatBadgeModule
  ],
  providers: [KeycloakService,AuthGuard,
    UserdetailsService,AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
