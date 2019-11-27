import { Component, OnInit, OnChanges, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginador: any;
  @Output() messageToEmit = new EventEmitter<number>();

  public paginas: number[];
  private desde: number;
  private hasta: number;


  constructor() { }

  ngOnInit() {
    this.initPaginador();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const paginadorActualizado = changes['paginador'];
    if (paginadorActualizado.previousValue) {
      this.initPaginador();
    }
  }

  initPaginador(): void {
    if (this.paginador.totalPages > 5) {
      this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
      this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

  public cargaPagina(pagina: number) {
    this.messageToEmit.emit(pagina);
  }
}
