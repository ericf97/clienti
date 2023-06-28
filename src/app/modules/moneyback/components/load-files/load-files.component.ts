import { Component, Input, OnInit, Output } from '@angular/core';
import { FilesInterface } from '../../interfaces/files.interface';
import { FilesService } from '../../services/files.service';
import * as FileSaver from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-load-files',
  templateUrl: './load-files.component.html',
  styleUrls: ['./load-files.component.scss'],
})
export class LoadFilesComponent implements OnInit {
  
  @Input() caseFiles: FilesInterface[] = [];
  @Input() caseId?: number;

  newFiles: FilesInterface[] = [];

  allowedFileTypes: string[] = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  constructor(private fileService: FilesService, private dialog: MatDialog) {}

  ngOnInit(): void {

    if(this.caseId) {
      this.fileService.getFiles(this.caseId).subscribe(
        {
          next: (result) => {
            this.caseFiles = [...result];
          }
        }
      )
    }
  }

  async onFileSelected(e: any) {

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      let dataBase64 = (await getBase64(file)) as string;
      dataBase64 = dataBase64.split('base64,')[1];
      const caseFile: FilesInterface = {
        fileName: file.name,
        fileData: dataBase64,
        caseId: this.caseId,
      };
      this.newFiles.push(caseFile);
      await this.postFiles();

    }
    this.caseFiles = [...this.caseFiles, ...this.newFiles];
    this.caseFiles = this.caseFiles.filter(this.onlyUnique);
  }

  fileSelectedConfirm (e: any) {
    this.dialog.open(PopUpComponent, {
      data: {
        text: 'Su archivo pasara por un proceso de escaneo antes de ser subido a nuestros servidores',
        callback: () => {
          this.onFileSelected(e);
          this.dialog.closeAll();
        }
      }
    });
  }
  //PARA NO CARGAR ARCHIVOS DUPLICADOS
  onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  async postFiles() {
    console.log(this.newFiles);
    for (let i = 0; i < this.newFiles.length; i++) {
      await this.fileService.postFiles(this.newFiles[i]).subscribe(console.log);
    }
  }

  openDeletePopUp(name: string) {
    this.dialog.open(PopUpComponent, {
      height: '30vh',
      width: '40vw',
      data: {
        text: `¿Desea eliminar el archivo "${name}"?`,
        callback: () => {
          this.dialog.closeAll();
          this.deleteFile(name);
        },
      },
    });
  }

  async deleteFile(name: string) {
    const item = this.caseFiles.filter((item) => item.fileName === name)[0];

    this.fileService.deleteFile(item).subscribe({
      next: () => {
        this.caseFiles = this.caseFiles.filter((item) => item.fileName !== name);
      }
    });
  }

  downloadFile(fileName: string) {
    let file = this.caseFiles.find((a) => a.fileName == fileName);

    //extract type of file
    let type = file?.fileData?.split(';base64,')[0].replace('data:', '');

    //splits valid base64string
    let base64string = file?.fileData?.split('base64,')[1];

    //splits base64string in an array of uint8 with 512 length for better perfomance
    const byteCharacters = atob(base64string!);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    //creates blob
    let blob = new Blob(byteArrays, {
      type: type,
    });

    //download file
    FileSaver.saveAs(blob, file?.fileName);
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
