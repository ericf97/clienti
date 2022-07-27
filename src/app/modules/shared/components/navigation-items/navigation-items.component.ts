import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface NavItems {
  title: string,
  link: string,
  icon: string
}

@Component({
  selector: 'app-navigation-items',
  templateUrl: './navigation-items.component.html',
  styleUrls: ['./navigation-items.component.scss']
})
export class NavigationItemsComponent implements OnInit {

  navList: NavItems[] = [
    {
      title: 'Inicio',
      link: '/home',
      icon: 'home'
    },
    {
      title: 'Casos',
      link: '/home/cases',
      icon: 'library_books'
    },

  ]

  constructor( public router: Router ) { }

  ngOnInit(): void {
    console.log(this.router.url);
    
  }

}
