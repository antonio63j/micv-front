import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DetalleActividadComponent } from '../experiencia/detalle-actividad/detalle-actividad.component';
import { Experiencia } from '../modelos/experiencia';
@Injectable({
  providedIn: 'root'
})
export class ModalScrollableService {
  modal: any;

  constructor(private ngbModal: NgbModal) { }

  public openModalScrollable(
    experiencia: any,
    componente: any,
    title = 'titular',
    prompt = 'Really?'

  ): Observable<boolean> {
    this.modal = this.ngbModal.open(componente,
      // { size: 'lg', backdrop: 'static' });
      { size: 'xl', backdrop: 'static'});
    this.modal.componentInstance.experiencia = experiencia;
    this.modal.componentInstance.prompt = prompt;
    this.modal.componentInstance.title = title;

    return from(this.modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }

  closeModalScrollable() {
    this.modal.close();
  }
  

}
