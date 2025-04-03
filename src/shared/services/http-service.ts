import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private buildUrl(endpoint: string): string {
    return `${environment.apiUrl}/${endpoint}`;
  }

  public get<T>(endpoint: string): Observable<T> {
    return new Observable<T>((observer) => {
      fetch(this.buildUrl(endpoint), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public post<T>(endpoint: string, body: any): Observable<T> {
    return new Observable<T>((observer) => {
      fetch(this.buildUrl(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public put<T>(endpoint: string, body: any): Observable<T> {
    return new Observable<T>((observer) => {
      fetch(this.buildUrl(endpoint), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public delete<T>(endpoint: string): Observable<T> {
    return new Observable<T>((observer) => {
      fetch(this.buildUrl(endpoint), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
