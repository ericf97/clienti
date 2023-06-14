import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-case-comments-popup',
  templateUrl: './case-comments-popup.component.html',
  styleUrls: ['./case-comments-popup.component.scss'],
})
export class CaseCommentsPopupComponent implements OnInit {
  text: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CaseCommentsPopupComponent>
  ) {}

  ngOnInit(): void {
    this.text = this.data.text;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveComment() {
    this.data.callback(this.text);
  }
}
