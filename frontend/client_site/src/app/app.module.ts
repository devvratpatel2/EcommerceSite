import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { AuthModule } from './auth/auth.module';
import { ServicesComponent } from './services/services.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CompanyeditComponent } from './companyedit/companyedit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ServicesComponent,
    CompaniesListComponent,
    ShoppingcartComponent,
    CompanyeditComponent,
    ProductListComponent,
    ProducteditComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
