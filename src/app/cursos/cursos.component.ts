import { Component, OnInit, OnDestroy } from '@angular/core';
import { CursosService } from './cursos.service';
import { Curso } from '../modelos/curso';
import { debug } from 'util';
import { Subscription, Subject } from 'rxjs';
import { takeUntil, tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})

export class CursosComponent implements OnInit, OnDestroy {

  cursos: Curso[];
  private page: number;
  private observ$: Subscription = null;
  private unsubscribe$ = new Subject();
  public paginador: any;
  private subscriptionParams$: Subscription = null;
  private subscriptionEvents$: Subscription = null;

  constructor(private cursosService: CursosService) {
    this.cursos = [];
  }

  ngOnInit() {
    this.nuevaPagina(0);
  }

  public getPagina(pagina: number) {
    this.nuevaPagina(pagina);
  }

  nuevaPagina(pagina: number) {
    this.observ$ = this.cursosService.getCursos(pagina).pipe(
      takeUntil(this.unsubscribe$),
      tap((response: any) => {
        // console.log(response);
      }),
      map((response: any) => {
        (response.content as Curso[]).map(curso => {
          curso.nombre = curso.nombre.toUpperCase();
          return curso;
        });
        return response;
      }),
    ).subscribe(
      response => {
        this.cursos = (response.content as Curso[]);
        this.paginador = response;
      }
      , err => {
        // swal.fire('Error carga de cursoss ', 'error grave', 'error');
      }
    );

  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy (), realizando unsubscribes');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
