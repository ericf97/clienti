import { Component, OnInit } from '@angular/core';
import { Case } from '../../interfaces/case.interface';
import { CasesService } from '../../services/cases.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
})
export class CasesComponent implements OnInit {
  casos: Case[] = [];

  spinner: boolean = true;

  constructor(private casesService: CasesService) {}

  ngOnInit(): void {
    this.casesService.getCases().subscribe((cases) => {
      console.log(cases);
      this.casos = cases;
      if (this.casos) {
        this.spinner = false;
      }
    });
  }
}
