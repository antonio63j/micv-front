import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms'; // Necesario para AngularEditorModule

import { CursosService } from './cursos/cursos.service';
import { ConocimientostecnicosService } from './conocimientostecnicos/conocimientostecnicos.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CursosComponent } from './cursos/cursos.component';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { PaginatorComponent } from './paginator/paginator.component';
import { ConocimientostecnicosComponent } from './conocimientostecnicos/conocimientostecnicos.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { ExperienciaService } from './experiencia/experiencia.service';
import { DetalleActividadComponent } from './experiencia/detalle-actividad/detalle-actividad.component';
import { DetalleExperienciaComponent } from './experiencia/detalle-experiencia/detalle-experiencia.component';
import { ModalScrollableService } from './modalScrollable/modal-scrollable.service';
import { SearchComponent } from './search/search.component';
import { DownloadComponent } from './download/download.component';

const routes: Routes = [
  {path: '', redirectTo: '/perfil', pathMatch: 'full'},
  {path: 'perfil', component: PerfilComponent},
  {path: 'cursos', component: CursosComponent},
  {path: 'conocimientostecnicos', component: ConocimientostecnicosComponent},
  {path: 'conocimientostecnicos/tipo/:tipo', component: ConocimientostecnicosComponent},
  {path: 'experiencia', component: ExperienciaComponent},
  {path: 'search/busca/:busca', component: SearchComponent},
  {path: 'download', component: DownloadComponent}

  // {path: 'cursos/page/:page', component: CursosComponent},
/*   {path: 'directivas', component: DirectivaComponent, canActivate: [AuthGuard]},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  {path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  {path: 'login', component: LoginComponent},
  {path: 'facturas/:id', component: DetalleFacturaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'} },
  {path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} } */
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PerfilComponent,
    CursosComponent,
    PaginatorComponent,
    ConocimientostecnicosComponent,
    ExperienciaComponent,
    DetalleActividadComponent,
    DetalleExperienciaComponent,
    SearchComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    AngularEditorModule,
    FormsModule
  ],
  providers: [
    CursosService,
    ConocimientostecnicosService,
    ExperienciaService,
    ModalScrollableService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}

  ],
  entryComponents: [
    DetalleActividadComponent,
    DetalleExperienciaComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
