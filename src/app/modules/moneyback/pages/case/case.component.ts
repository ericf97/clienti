import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  NgForm,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Case } from '../../interfaces/case.interface';
import { CasesService } from '../../services/cases.service';
import { FilesInterface } from '../../interfaces/files.interface';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent implements OnInit {

  editing: boolean = false;
  spinner: boolean = true;

  case!: Case;
  caseFiles: FilesInterface[] = [];

  caseForm: FormGroup = this.fb.group({
    addressUser: ['',],
    amountLost: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    lastName: [''],
    name: ['', [Validators.required]],
    nameEnterprise: ['', [Validators.required]],
    nameState: ['', Validators.required],
    phone: [''],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private casesService: CasesService,
    private fileService: FilesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.casesService.getCases().subscribe((resp) => {
        this.case = resp.find((caso) => caso.caseId == id)!;
        // this.fileService.getFiles( this.caso.caseId ).subscribe((resp) => {
        //   console.log('resp', resp);

        //   this.caseFiles = resp;
        // })
        this.caseForm.reset({
          addressUser: this.case.addressUser,
          amountLost: this.case.amountLost,
          email: this.case.email,
          lastName: this.case.lastName,
          name: this.case.name,
          nameEnterprise: this.case.nameEnterprise,
          nameState: this.case.nameState,
          phone: this.case.phone,
        });
        this.caseForm.disable();
        this.spinner = false;
      });
    });
  }

  editForm() {
    this.editing = !this.editing;
    this.editing ? this.caseForm.enable() : this.caseForm.disable();
    
  }

  async onFileSelected(e: any) {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      let dataBase64 = (await getBase64(file)) as string;
      dataBase64 = dataBase64.split('base64,')[1];
      const caseFile: FilesInterface = {
        caseId: this.case.caseId,
        fileName: file.name,
        fileData: dataBase64,
      };
      this.caseFiles.push(caseFile);
    }

    this.caseFiles = this.caseFiles.filter( this.onlyUnique );

    console.log(this.caseFiles);
  }

  async postCase() {
    for (let i = 0; i < this.caseFiles.length; i++) {
      await this.fileService.postFiles(this.caseFiles[i]).subscribe((resp) => console.log(resp));
    }
  }

  deleteFile( name: string ) {
    const aux = this.caseFiles.filter( item => item.fileName !== name);
    this.caseFiles = aux;
  }

  //PARA NO CARGAR ARCHIVOS DUPLICADOS
  onlyUnique( value: any, index: any, self: any ) {
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
