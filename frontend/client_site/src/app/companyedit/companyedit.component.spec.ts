import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyeditComponent } from './companyedit.component';

describe('CompanyeditComponent', () => {
  let component: CompanyeditComponent;
  let fixture: ComponentFixture<CompanyeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
