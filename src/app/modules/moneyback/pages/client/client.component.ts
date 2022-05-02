import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: [],
})
export class ClientComponent implements OnInit {
  cliente!: Cliente;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cliente = this.clientService.getClientes()[id-1];
      console.log(this.cliente);
    });
  }
}
