import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models/company';
import { Product } from '../models/product';
import { CompanyService } from '../services/company.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent implements OnInit {
  id:string = "N/A";
  productName:string = "N/A";
  companyName:string = "N/A";
  selectedProduct:Product;
  companies: Company[];
  productRef = new FormGroup({
    code:new FormControl("", [Validators.required]),
    name:new FormControl("", [Validators.required]),
    details:new FormControl("", [Validators.required]),
    image:new FormControl("", [Validators.required]),
    price:new FormControl("", [Validators.required]),
    company:new FormControl("", [Validators.required])
  });

  constructor(private route: ActivatedRoute, private productService: ProductService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.updatePageProductDetails();
    this.updateCompanyTable();
  }

  updateCompanyTable() {
    this.companyService.getCompanies().subscribe(result => {
      this.companies = result;
      console.log(this.companies);
    }
    )
  }

  updatePageProductDetails():void {
    this.route.params.subscribe( params => {
      this.id=params.id;
      this.productService.getProductById(this.id).subscribe(
        result=>{
          this.productName=result.name;
          this.selectedProduct=result
          this.companyService.getCompanyById(this.selectedProduct.company).subscribe(
            result=>{
              this.companyName = result.name
            }
          )
        }
      )
    });
  }

  editProductDetails(): void {
    this.selectedProduct.name = (this.productRef.value.name);
    this.companyService.getCompanyById(this.productRef.value.company).subscribe(
      result => {
        console.log(result);
        this.productRef.value.company = result
        this.productService.updateProductById(this.productRef.value, this.id).
        subscribe(result=>{this.updatePageProductDetails();});
      }
    )
  }
}