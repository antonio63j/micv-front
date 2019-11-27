import { Component, OnInit, OnDestroy } from '@angular/core';
import { Experiencia } from 'src/app/modelos/experiencia';
import { Subscription, Subject, throwError } from 'rxjs';
import { ModalService } from 'src/app/modalScrollable/modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienciaService } from '../experiencia.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { takeUntil, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-experiencia',
  templateUrl: './detalle-experiencia.component.html',
  styleUrls: ['./detalle-experiencia.component.css']
})
export class DetalleExperienciaComponent implements OnInit, OnDestroy {
  title: string;
  prompt: string;
  experiencia: Experiencia;

  private observ$: Subscription = null;
  private unsubscribe$ = new Subject();
  private subscriptionParams$: Subscription = null;
  public erroresValidacion: string[];

  constructor(
    public modalService: ModalService,
    public activeModal: NgbActiveModal,
    private expericiaService: ExperienciaService
    ) { }

    config: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'no',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Introducir texto aquí...',
      defaultParagraphSeparator: '',
      defaultFontName: 'Arial',
      defaultFontSize: '3',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    };

  ngOnInit() {

  }

  public update(experiencia: Experiencia) {
   this.observ$ = this.expericiaService.update(experiencia).pipe(
      takeUntil(this.unsubscribe$),
      catchError(err => {
        console.log('Se captura el error con catchError(err) y se vuelve a lanzar con throwError(err)', err);
        return throwError(err);
      })
    )
      .subscribe(
        experiencia => {
          // this.router.navigate(['/experiencia/page', 0]);
          swal.fire('Actividad ', `del proyecto actulizada`, 'success');
        }
        , err => {
          if (err.status === 400) {
            this.erroresValidacion = err.error.errors as string[];
            console.log(this.erroresValidacion);
          } else {
            // this.router.navigate(['/clientes']);
            swal.fire('Error al actulizar actividad', err.error.error, 'error');
          }
        }
      );
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy (), realizando unsubscribes');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
