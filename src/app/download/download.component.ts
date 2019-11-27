import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  text = 'texto';

  constructor(
    private httpClient: HttpClient,
    private fileSaverService: FileSaverService
  ) { }

  ngOnInit() {
    this.onDown();
  }

  onDown() {
    const fileName = 'Curriculum_Vitae.pdf';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'Application/pdf');

    this.httpClient.get(environment.urlEndPoint + '/download/cvpdf-alternativo', {
      headers,
      observe: 'response',
      responseType: 'blob'
    }).subscribe(res => {
      this.fileSaverService.save(res.body, fileName);
    }
      , err => {
        swal.fire('Error en descarga', err, 'error');
      }
    );

  }

  /*   const contentDisposition = res.headers.get('content-disposition') || '';
    const matches = /filename=([^;]+)/ig.exec(contentDisposition);
    const fileName = (matches[1] || 'untitled').trim(); */


}
