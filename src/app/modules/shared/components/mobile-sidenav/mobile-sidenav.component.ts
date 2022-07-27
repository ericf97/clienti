import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-sidenav',
  templateUrl: './mobile-sidenav.component.html',
  styleUrls: ['./mobile-sidenav.component.scss']
})
export class MobileSidenavComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeHandler() {
    this.closeSidenav.emit();
  }

}
