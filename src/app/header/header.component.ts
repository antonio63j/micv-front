import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Mi CV con angular 8 y spring';
  strBusqueda: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.strBusqueda = '';
  }

  public buscar(): void {
    this.router.navigate(['/search/busca', this.strBusqueda]);
  }


}
