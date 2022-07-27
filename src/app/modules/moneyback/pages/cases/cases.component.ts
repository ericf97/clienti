import { Component, OnInit } from '@angular/core';
import { Caso } from '../../interfaces/caso.interface';
import { CasesService } from '../../services/cases.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
})
export class CasesComponent implements OnInit {
  casos: Caso[] = [];

  spinner: boolean = true;

  constructor(private casesService: CasesService) {}

  ngOnInit(): void {
    this.casesService.getCasos().subscribe((cases) => {
      console.log(cases);
      this.casos = cases;
      if (this.casos) {
        this.spinner = false;
      }
    });
  }
}
