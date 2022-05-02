import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Caso } from '../../interfaces/caso.interface';
import { CasesService } from '../../services/cases.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {

  caso!:Caso;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private casesService: CasesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.caso = this.casesService.getCasos()[id-1];
      console.log(this.caso);
    });
  }

}
