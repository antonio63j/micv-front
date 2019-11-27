import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Curso } from '../modelos/curso';

/* @Injectable({
  providedIn: 'root'
}) */
@Injectable()
export class CursosService implements OnDestroy {

  constructor(private http: HttpClient) {
  }

  getCursos(page: number): Observable<any> {
    const parametros = new HttpParams()
      .set('page', page.toString())
      .set('size', '12');
    return this.http.get<Curso[]>(environment.urlEndPoint + '/cursos', { params: parametros }).pipe(
      tap((response: any) => {
        (response.content as Curso[]).forEach(curso => console.log(curso));
      })
    );
  }

  getCursosConFiltro(strBusca: string): Observable<any> {
    const parametros = new HttpParams()
      .set('strBusca', strBusca);
    return this.http.get<Curso[]>(environment.urlEndPoint + '/cursos-filtro', { params: parametros });
  }

  ngOnDestroy(): void {
    console.log('En ngOnDestroy()');
  }
}
