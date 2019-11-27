import { Component, OnInit, OnDestroy } from '@angular/core';
import { Experiencia } from '../modelos/experiencia';
import { Subscription, Subject } from 'rxjs';
import { ExperienciaService } from './experiencia.service';
import { takeUntil, tap, map, take } from 'rxjs/operators';
import { ModalScrollableService } from '../modalScrollable/modal-scrollable.service';
import { DetalleActividadComponent} from './detalle-actividad/detalle-actividad.component';
import { DetalleExperienciaComponent} from './detalle-experiencia/detalle-experiencia.component';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit, OnDestroy {

  experiencias: Experiencia[];
  private page: number;
  private observ$: Subscription = null;
  private unsubscribe$ = new Subject();
  public paginador: any;
  private subscriptionParams$: Subscription = null;
  private subscriptionEvents$: Subscription = null;

  constructor(
    private experienciaService: ExperienciaService,
    private modalScrollableService: ModalScrollableService
    ) { }


  ngOnInit() {
    this.nuevaPagina(0);
  }

  public getPagina(pagina: number) {
    this.nuevaPagina(pagina);
  }

  nuevaPagina(pagina: number) {
    this.observ$ = this.experienciaService.getExperiencia(pagina).pipe(
      takeUntil(this.unsubscribe$),
      tap((response: any) => {
        // console.log(response);
      }),
      map((response: any) => {
        (response.content as Experiencia[]).map(experiencia => {
          experiencia.empresa = experiencia.empresa.toUpperCase();
          experiencia.cliente = experiencia.cliente.toUpperCase();
          return experiencia;
        });
        return response;
      }),
    ).subscribe(
      response => {
        this.experiencias = (response.content as Experiencia[]);
        this.paginador = response;
      }
      , err => {
        // swal.fire('Error carga de cursoss ', 'error grave', 'error');
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

  ngOnDestroy() {
    console.log('ngOnDestroy (), realizando unsubscribes');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }

}
