import { CompanyService } from './../services/company.service';
import { Company } from './../models/company';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {
  companyRef = new FormGroup({
    name:new FormControl()
  });

  companies: Company[];

  constructor(private companyService: CompanyService) { }

  updateCompanyTable() {
    this.companyService.getCompanies().subscribe(result => {
      this.companies = result;
      console.log(this.companies);
    })
  }
  ngOnInit(): void {
    this.updateCompanyTable()
  }

  deleteCompany(idToDelete): void {
    this.companyService.deleteCompanyById(idToDelete).
    subscribe(
      result=>{this.updateCompanyTable()}
    )
  }

  storeCompanyDetails(): void {
    this.companyService.addCompany(this.companyRef.value).
    subscribe(
      result => {this.updateCompanyTable()}
    )

    
  }
}