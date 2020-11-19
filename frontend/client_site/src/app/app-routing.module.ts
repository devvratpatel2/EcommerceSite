import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth/auth.guard';
import { ServicesComponent } from './services/services.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { FormsModule } from '@angular/forms';
import { CompanyeditComponent } from './companyedit/companyedit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'companies-list', component: CompaniesListComponent, canActivate: [AuthGuard] },
  { path: 'companyedit/:id', component: CompanyeditComponent, canActivate: [AuthGuard] },
  { path: 'products-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'productedit/:id', component: ProducteditComponent, canActivate: [AuthGuard]},
  { path: 'shop', component: InventoryComponent, canActivate: [AuthGuard]},
  { path: 'cart', component: ShoppingcartComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
