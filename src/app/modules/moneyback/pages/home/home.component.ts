import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { Case } from '../../interfaces/case.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cases: Case[] = [];
  
  constructor(
    private casesService:CasesService
    ) { }

  ngOnInit(): void {
    this.casesService.getCases().subscribe( ( resp ) => {
      this.cases = resp;
    })
  }

}

