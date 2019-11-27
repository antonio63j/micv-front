import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators';

import { Curso } from '../modelos/curso';
import { Conocimientotecnico } from '../modelos/Conocimientotecnico';
import { Experiencia } from '../modelos/experiencia';
import { CursosService } from '../cursos/cursos.service';
import { ConocimientostecnicosService } from '../conocimientostecnicos/conocimientostecnicos.service';
import { ExperienciaService } from '../experiencia/experiencia.service';
import swal from 'sweetalert2';
import { ModalScrollableService } from '../modalScrollable/modal-scrollable.service';
import { DetalleActividadComponent } from '../experiencia/detalle-actividad/detalle-actividad.component';
import { DetalleExperienciaComponent } from '../experiencia/detalle-experiencia/detalle-experiencia.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  public cursos: Curso[];
  public conocimientostecnicos: Conocimientotecnico[];
  public experiencias: Experiencia[];

  private observ$: Subscription = null;
  private subscriptionParams$: Subscription = null;
  private unsubscribe$ = new Subject();
  strBusca: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService,
    private conocimientostecnicoService: ConocimientostecnicosService,
    private experienciaService: ExperienciaService,
    private modalScrollableService: ModalScrollableService) {
  }

  ngOnInit() {
    this.cursos = [];
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
    this.strBusca = params.busca;
    this.subscripcionCursos();
    this.subscripcionConocimientostecnicos();
    this.subscripcionExperiencia();
  }

  private subscripcionCursos() {
    this.observ$ = this.cursosService.getCursosConFiltro(this.strBusca).pipe(
      takeUntil(this.unsubscribe$),
      map((response: any) => {
        (response as Curso[]).map(curso => {
          curso.nombre = curso.nombre.toUpperCase();
          return curso;
        });
        return response;
      }),
    ).subscribe(
      cursos => {
        this.cursos = cursos;
      }
      , err => {
        swal.fire('Error carga de cursoss ', err.message, 'error');
      }
    );
  }

  private subscripcionConocimientostecnicos() {
    this.observ$ = this.conocimientostecnicoService.getConocimientostecnicosConFiltro(this.strBusca).pipe(
      takeUntil(this.unsubscribe$),
      map((response: any) => {

        (response as Conocimientotecnico[]).map(conocimientostecnicos => {
          conocimientostecnicos.nombre = conocimientostecnicos.nombre.toUpperCase();
          return conocimientostecnicos;
        });
        return response;
      }),
    ).subscribe(
      conocimientostecnicos => {
        this.conocimientostecnicos = conocimientostecnicos;
        console.log(this.conocimientostecnicos)
      }
      , err => {
        swal.fire('Error carga de conocimientostecnicos ', err.message, 'error');
      }
    );
  }

  private subscripcionExperiencia() {
    this.observ$ = this.experienciaService.getExperienciaConFiltro(this.strBusca).pipe(
      takeUntil(this.unsubscribe$),
/*       map((response: any) => {

        (response as Experiencia[]).map(experiencia => {
          return experiencia;
        });
        return response;
      }), */
    ).subscribe(
      experiencias => {
        this.experiencias = experiencias;

      }
      , err => {
        swal.fire('Error carga de experiencia ', err.message, 'error');
      }
    );

  }

  public verActividades(experiencia: Experiencia) {
    this.modalScrollableService.openModalScrollable(
      experiencia, DetalleActividadComponent,
      'Actividades en los proyectos de este periodo', ''
    ).pipe(
      take(1) // take() manages unsubscription for us
    ).subscribe(result => {
      console.log({ confirmedResult: result });
      // this.confirmedResult = result;
    });

  }

  verExperiencia(experiencia: Experiencia) {
    this.modalScrollableService.openModalScrollable(
      experiencia, DetalleExperienciaComponent,
      'Experiencia adquirida en los proyectos de este periodo', ''
    ).pipe(
      take(1) // take() manages unsubscription for us
    ).subscribe(result => {
      console.log({ confirmedResult: result });
      // this.confirmedResult = result;
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy (), realizando unsubscribes');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
