import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomizeService {

  constructor() { }
  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();



  changeMessage(message: boolean): void {
    this.messageSource.next(message);
  }
}
