import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IshtaService {
  private pathService = '/api/auth';

  constructor(private httpClient: HttpClient) {}

  public testApiWelcome(): Observable<string> {
    return this.httpClient.get(`${this.pathService}/welcome`, {
      responseType: 'text',
    });
  }

  public testInternet(): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>('https://httpbin.org/get', {
      observe: 'response',
    });
  }
}
