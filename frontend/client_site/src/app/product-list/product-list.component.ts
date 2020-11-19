import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Company } from '../models/company';
import { Product } from '../models/product';
import { CompanyService } from '../services/company.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productRef = new FormGroup({
    code:new FormControl(),
    name:new FormControl(),
    details:new FormControl(),
    image:new FormControl(),
    price:new FormControl(),
    company:new FormControl()
  });
  companies: Company[];
  products: Product[];

  constructor(private companyService: CompanyService, private productService: ProductService) { }

  getCompanies() {
    this.companyService.getCompanies().subscribe(result => {
      this.companies = result;
    })
  }

  updateProductTable() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    })
  }


  ngOnInit(): void {
    this.updateProductTable();
    this.getCompanies();
  }
  
  deleteProduct(idToDelete): void {
    this.productService.deleteProductById(idToDelete).
    subscribe(
      result=>{this.updateProductTable()}
    )

  }

  storeProductDetails(): void {    
    console.log(`Company ID: ${this.productRef.value.company}`);

    this.companyService.getCompanyById(this.productRef.value.company).subscribe(
      result => {
        this.productRef.value.company = result

        this.productService.addProduct(this.productRef.value).
        subscribe(
          result => {this.updateProductTable()}
        )
      }
    )
  }
}