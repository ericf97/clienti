import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
})
export class CasesComponent implements OnInit {

  casos = this.casesService.getCasos();

  constructor(private casesService:CasesService ) { }

  ngOnInit(): void {
  }

}
