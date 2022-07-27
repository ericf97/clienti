import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DomSanitizer } from '@angular/platform-browser';

interface PopUpType {
  type: string;
  data: any;
  callback: (data: any) => {}
}
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    public sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: PopUpType
  ) {}

  ngOnInit(): void {
  }

}
