import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-companyedit',
  templateUrl: './companyedit.component.html',
  styleUrls: ['./companyedit.component.css']
})
export class CompanyeditComponent implements OnInit {
  id:string = "N/A";
  companyName:string = "N/A";
  selectedCompany:Company;
  companyRef = new FormGroup({
    name:new FormControl()
  });


  constructor(private route: ActivatedRoute, private companyService: CompanyService) { }
  ngOnInit(): void {
    this.updatePageCompanyDetails();
  }

  // Update Company details
  updatePageCompanyDetails():void {
    this.route.params.subscribe( params => {
      this.id=params.id;
      this.companyService.getCompanyById(this.id).subscribe(
        result=>{
          this.companyName=result.name;
          this.selectedCompany=result
        }
      )
    });
  }

  // Edit Company details
  editCompanyDetails(): void {
    console.log(this.companyRef.value.name);
    this.selectedCompany.name = (this.companyRef.value.name);
    this.companyService.updateCompanyById(this.selectedCompany, this.id).
    subscribe(result=>{});
    this.updatePageCompanyDetails();
  }
}