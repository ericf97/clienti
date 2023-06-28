import { Component, Input, OnInit } from '@angular/core';
import { CasesService } from 'src/app/modules/moneyback/services/cases.service';

@Component({
  selector: 'app-progress-status',
  templateUrl: './progress-status.component.html',
  styleUrls: ['./progress-status.component.scss'],
})
export class ProgressStatusComponent implements OnInit {
  @Input() stateId!: number;

  caseStates: any = [];

  progressColors = [
    { class: 'orange', limit: 35 },
    { class: 'yellow', limit: 75 },
    { class: 'green', limit: 99 },
    { class: 'success', limit: 100 },
  ];

  progress!: any;

  constructor(public casesService: CasesService) {}

  ngOnInit(): void {
    this.caseStates = this.casesService.caseStates;
    this.progress = this.setProgress();
  }

  setProgress() {
    let progress = this.caseStates.find((a: any) => a.stateId == this.stateId);

    let colors = this.progressColors.find(
      (a) => a.limit >= progress.percentage
    );
    return {
      ...progress,
      ...colors,
    };
  }
}
