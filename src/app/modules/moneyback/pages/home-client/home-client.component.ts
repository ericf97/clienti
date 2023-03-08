import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CasesService } from '../../services/cases.service';
import { Case } from '../../interfaces/case.interface';
import { MyErrorStateMatcher } from '../case/case.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss'],
})
export class HomeClientComponent implements OnInit {
  spinner: boolean = true;
  case!: Case;
  editing: boolean = false;

  matcher = new MyErrorStateMatcher();

  caseForm: FormGroup = this.fb.group({
    addressUser: [''],
    amountLost: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    lastName: ['', [Validators.required]],
    dateDeposit: ['', [Validators.required]],
    name: ['', [Validators.required]],
    nameEnterprise: ['', [Validators.required]],
    nameState: ['', [Validators.required]],
    depositType: ['', [Validators.required]],
    moneyType: ['', [Validators.required]],
    phone: [''],
    description: ['']
  });

  constructor(
    private router: Router,
    public authService: AuthService,
    public casesService: CasesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.authService.activeUser == 'admin') {
      this.router.navigate(['home']);
    }
    this.casesService.getCases().subscribe((resp) => {
      this.case = resp.find((caso) => caso.caseId == 3)!;
      this.spinner = false;
      this.resetForm();
    });
  }

  resetForm() {
    this.caseForm.reset({
      addressUser: this.case.addressUser,
      amountLost: this.case.amountLost,
      email: this.case.email,
      lastName: this.case.lastName,
      dateDeposit: this.case.dateDeposit,
      name: this.case.name,
      nameEnterprise: this.case.nameEnterprise,
      nameState: this.case.nameState,
      depositType: this.case.depositType,
      moneyType: this.case.moneyType,
      phone: this.case.phone,
    });
    this.disableForm();
  }
  
  enableForm() {
    this.editing = true;
    this.caseForm.enable();
    this.caseForm.controls['name'].disable();
    this.caseForm.controls['lastName'].disable();
    this.caseForm.controls['email'].disable();
  }

  disableForm() {
    this.editing = false;
    this.caseForm.disable();
  }
}
