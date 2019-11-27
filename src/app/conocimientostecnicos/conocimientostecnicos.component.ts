import { Component, OnInit, OnDestroy } from '@angular/core';
import { Conocimientotecnico } from '../modelos/conocimientotecnico';
import { Subscription, Subject } from 'rxjs';
import { ConocimientostecnicosService } from './conocimientostecnicos.service';
import { takeUntil, tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conocimientostecnicos',
  templateUrl: './conocimientostecnicos.component.html',
  styleUrls: ['./conocimientostecnicos.component.css']
})
export class ConocimientostecnicosComponent implements OnInit, OnDestroy {

  conocimientostecnicos: Conocimientotecnico[];
  private page: number;
  private observ$: Subscription = null;
  private unsubscribe$ = new Subject();
  public paginador: any;
  private subscriptionParams$: Subscription = null;
  private subscriptionEvents$: Subscription = null;
  tipoConocimiento: string = null;

  constructor(private conocimientotecnicoService: ConocimientostecnicosService,
              private activatedRoute: ActivatedRoute) {
    this.conocimientostecnicos = [];
  }

  ngOnInit() {
    this.subscripcionGestionParams();
  }

  subscripcionGestionParams() {
    this.subscriptionParams$ = this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(params => this.gestionParams(params));
  }

  gestionParams(params: any): void {
    this.tipoConocimiento = params.tipo; // o +params.get('tipo');
    if (!this.tipoConocimiento) {
      this.tipoConocimiento = null;
    } else {
      // this.tipoConocimiento = params;
    }
    this.nuevaPagina(0);
  }

  // llamado desde paginador (componente hijo)
  public getPagina(pagina: number) {
    this.nuevaPagina(pagina);
  }

  nuevaPagina(pagina: number) {
    this.observ$ = this.conocimientotecnicoService.getConocimientostecnicos(pagina, this.tipoConocimiento).pipe(
      takeUntil(this.unsubscribe$),
      tap((response: any) => {
        // console.log(response);
      }),
      map((response: any) => {
        (response.content as Conocimientotecnico[]).map(ctenico => {
          ctenico.nombre = ctenico.nombre.toUpperCase();
          return ctenico;
        });
        return response;
      }),
    ).subscribe(
      response => {
        this.conocimientostecnicos = (response.content as Conocimientotecnico[]);
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
