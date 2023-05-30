import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  NgForm,
  Validators,
  FormBuilder,
  FormGroupDirective,
} from '@angular/forms';
import { Case } from '../../interfaces/case.interface';
import { CasesService } from '../../services/cases.service';
import { FilesInterface } from '../../interfaces/files.interface';
import { FilesService } from '../../services/files.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { COUNTRIES, Country } from 'src/app/modules/shared/constants/countries';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.errors && form?.submitted);
  }
}

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent implements OnInit {
  editing: boolean = false;
  spinner: boolean = true;

  case!: Case;
  newCase: boolean = true;

  emails: string[] = [];
  foundEmails: string[] = [];

  countries: Country[] = COUNTRIES;
  selectedCountry!: Country;

  caseFiles: FilesInterface[] = [];

  newFiles: FilesInterface[] = [];

  matcher = new MyErrorStateMatcher();

  caseForm: FormGroup = this.fb.group({
    country: [''],
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
    newUser: [true],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public casesService: CasesService,
    private fileService: FilesService,
    private fb: FormBuilder,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.casesService.getCaseStates();
    this.activatedRoute.params.subscribe(({ id }) => {
      this.casesService.getCases().subscribe((resp) => {
        if (id != 'new') {
          this.newCase = false;
          this.case = resp.find((caso) => caso.caseId == id)!;
          // this.fileService.getFiles(this.case.caseId!).subscribe((resp) => {
          //   console.log('resp', resp);
          //   this.caseFiles = resp;
          // });
          this.resetForm();
          this.disableForm();
          this.spinner = false;
        } else {
          this.emails = [...new Set<string>(resp.map((a) => a.email))];
          this.foundEmails = this.emails;
          this.spinner = false;
          this.editing = true;
        }
      });
    });
  }

  enableForm() {
    this.editing = true;
    this.caseForm.enable();
  }

  disableForm() {
    this.editing = false;
    this.caseForm.disable();
  }

  resetForm() {
    this.selectCountry(this.case.country!)!;
    this.caseForm.reset({
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
      newUser: false,
    });
    this.disableForm();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  async onFileSelected(e: any) {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      let dataBase64 = (await getBase64(file)) as string;
      dataBase64 = dataBase64.split('base64,')[1];
      const caseFile: FilesInterface = {
        Name: file.name,
        fileData: dataBase64,
        caseId: this.case.caseId,
      };
      this.newFiles.push(caseFile);
    }
    this.caseFiles = [...this.caseFiles, ...this.newFiles];
    console.log(this.caseFiles);
    this.caseFiles = this.caseFiles.filter(this.onlyUnique);

    console.log(this.caseFiles);
  }

  async postFiles() {
    console.log(this.newFiles);
    for (let i = 0; i < this.newFiles.length; i++) {
      await this.fileService.postFiles(this.newFiles[i]).subscribe(console.log);
    }
  }

  postCase() {
    this.caseForm.markAllAsTouched();
    if (this.caseForm.valid) {
      console.log('post');
      this.caseForm.controls['dateDeposit'].setValue(
        this.datePipe.transform(
          this.caseForm.controls['dateDeposit'].value,
          'yyyy-MM-dd'
        )
      );
      this.case = { ...this.case, ...this.caseForm.value };
      this.case.phone = this.case.phone?.toString();
      console.log(this.case);
      this.postFiles();
      if (this.newCase) {
        this.casesService.postCase(this.case).subscribe({
          next: (resp) => {
            console.log(resp);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.casesService.editCase(this.case).subscribe({
          next: (resp) => {
            console.log(resp);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }

  deleteFile(name: string) {
    const aux = this.caseFiles.filter((item) => item.Name !== name);
    this.caseFiles = aux;
  }

  onKey({ value }: any) {
    this.foundEmails = this.search(value);
  }

  search(value: string) {
    return this.emails.filter((a) =>
      a.toLowerCase().startsWith(value.toLowerCase())
    );
  }

  selectCountry(country: string) {
    this.selectedCountry = COUNTRIES.find((a) => a.spa == country)!;
  }

  //PARA NO CARGAR ARCHIVOS DUPLICADOS
  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
}

async function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
