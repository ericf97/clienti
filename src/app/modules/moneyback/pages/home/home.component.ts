import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { CasesService } from '../../services/cases.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clients = this.clientService.getClientes();
  casos = this.casesService.getCasos();
  
  constructor(
    private clientService:ClientsService,
    private casesService:CasesService
    ) { }

  ngOnInit(): void {
  }

}
