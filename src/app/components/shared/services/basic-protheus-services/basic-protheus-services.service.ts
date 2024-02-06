import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicProtheusServicesService {
  private readonly urlApi: string = environment.api;
  private readonly acessToken: string =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBKd3RQdWJsaWNLZXlGb3IyNTYifQ.eyJpc3MiOiJUT1RWUy1BRFZQTC1GV0pXVCIsInN1YiI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE2OTI2NTEyODcsInVzZXJpZCI6IjAwMDAwMCIsImV4cCI6MTY5MjY1NDg4NywiZW52SWQiOiJwcm90aGV1czEyIn0.NNTwXq-ZCMR5R2nos2iCONedkJSPovEED1SGcsyEiZELYnx0dBnPbK1xVFk5sh2i7Ab6zFqglZyhBXyYejV7s064MdMPnXrCjVVToYOeiNN374PJo8gmgnp0UdNagtRIerkX13GrIQC7pabO5d8E85F7Gvc5VB5Y_MQ_8rpBniecO8cgndOSyMtKuk5S6qQ_8jQLfk4UtJyHkqNF_TAI3-DUZFIetui4bdcfGWju1Hik5xqpktp6Mso1yMgaVHsFzfcdNQ07DQxexakLjvwzvdpxRm7XPltdLuVvruG62UXPueDqqFIj_S196bRdMjfQBWazoLljM5Hz98gbmPOV4w';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic YWRtaW46YWRtaW4=`
    })
  };

  getFormStructView(alias: string): Observable<any> {
    return this.http.get(
      `${this.urlApi}api/framework/v1/basicProtheusServices/fwformstructview?alias=${alias}`,
      this.httpOptions
    );
  }
}
