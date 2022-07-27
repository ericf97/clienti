import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  casos = this.casesService.getCasos();
  
  constructor(
    private casesService:CasesService
    ) { }

  ngOnInit(): void {
  }

}
