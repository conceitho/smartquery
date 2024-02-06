import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PoResponse } from '../../model/po-response.interface';
@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {
  showMenuEmitter = new BehaviorSubject<boolean>(false);
  showMenu$ = this.showMenuEmitter.asObservable();

  path: string | undefined;

  private readonly urlApi: string = environment.api;

  constructor(private http: HttpClient) {}

  delete(id: string): Observable<{}> {
    return this.http.delete<{}>(`${this.urlApi}/${this.path}/${id}`).pipe(
      map(
        () => id,
        (error: any) => error
      )
    );
  }

  get(): Observable<PoResponse> {
    return this.http.get<PoResponse>(`${this.urlApi}/${this.path}`);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.urlApi}/${this.path}/${id}`);
  }

  getCount(): Observable<number> {
    return this.http.get<PoResponse>(`${this.urlApi}/${this.path}`).pipe(map(result => result.items.length));
  }

  post(entity: any): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${this.path}`, entity);
  }

  postPath(): Observable<T> {
    return this.http.post<T>(`${this.urlApi}/${this.path}`, ``);
  }

  put(entity: any): Observable<T> {
    return this.http.put<T>(`${this.urlApi}/${this.path}/${entity.id}`, entity);
  }
}
