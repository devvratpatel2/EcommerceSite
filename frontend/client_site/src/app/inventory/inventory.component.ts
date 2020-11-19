import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products: Product[];
  constructor(private productService: ProductService, private companyService:CompanyService) { }

  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {

    // Get the products list and attach their companies.
    this.productService.getProducts().
    subscribe(
      result => {
        this.products = result;
        for (let pp of this.products) {
          this.companyService.getCompanyById(pp.company).subscribe(comp=>{pp.company=comp})
        }
      }
    )
  }

}