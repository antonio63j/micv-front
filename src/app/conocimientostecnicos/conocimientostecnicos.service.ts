import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conocimientotecnico } from '../modelos/conocimientotecnico';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConocimientostecnicosService implements OnDestroy {

  constructor( private http: HttpClient) {
  }

  getConocimientostecnicos(page: number, tipo: string): Observable<any> {
    const parametros = new HttpParams()
      .set('page', page.toString())
      .set('size', '12')
      .set('tipo', tipo);
    return this.http.get<Conocimientotecnico[]>(environment.urlEndPoint + '/conocimientostecnicos', {params: parametros}).pipe(
      tap((response: any) => {
          (response.content as Conocimientotecnico[]).forEach (curso => console.log(curso));
      })
    );
  }

  getConocimientostecnicosConFiltro(strBusca: string): Observable<any> {
    const parametros = new HttpParams()
      .set('strBusca', strBusca);
    return this.http.get<Conocimientotecnico[]>(environment.urlEndPoint + '/conocimientotecnico-filtro', { params: parametros });
  }

  ngOnDestroy(): void {
    console.log('En ngOnDestroy()');
  }
}
