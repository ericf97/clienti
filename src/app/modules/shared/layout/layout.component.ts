import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  show:any;

  constructor( public auth: AuthService ) { }

  ngOnInit(): void {
    this.show = this.auth.activeUser
  }
  
}
