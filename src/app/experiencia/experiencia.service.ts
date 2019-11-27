import { Injectable, OnDestroy } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Experiencia } from '../modelos/experiencia';

import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService implements OnDestroy {

  constructor( private http: HttpClient) {

  }

  getExperiencia(page: number): Observable<any> {
    const parametros = new HttpParams()
      .set('page', page.toString())
      .set('size', '12');
    return this.http.get<Experiencia[]>(environment.urlEndPoint + '/experiencia', {params: parametros}).pipe(
      tap((response: any) => {
          (response.content as Experiencia[]).forEach (exp => console.log(exp));
      })
/*       ,
      map((response: any) => {
        (response.content as Curso[]).map(curso => {
          curso.nombre = curso.nombre.toUpperCase();
          return curso;
        });
        return response;
      }) */
    );
  }

  update(experiencia: Experiencia): Observable<any> {
    const parametros = new HttpParams()
      .set('id', experiencia.id.toString());
    return this.http.put<Experiencia>(environment.urlEndPoint + '/experiencia', experiencia, {params: parametros}).pipe(
      catchError(err => {
        console.log(`error al actualizar datos sobre la expericia laboral: ${err.message} `);
        return throwError(err);
      })
      , map((response: any) => response.experiencia as Experiencia)
    );
  }

  getExperienciaConFiltro(strBusca: string): Observable<any> {
    const parametros = new HttpParams()
      .set('strBusca', strBusca);
    return this.http.get<Experiencia[]>(environment.urlEndPoint + '/experiencia-filtro', { params: parametros });
  }

  ngOnDestroy() {

  }
}
