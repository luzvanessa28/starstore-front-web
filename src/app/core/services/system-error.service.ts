import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemErrorService {

  private error$: Subject<boolean>;

  constructor() {
    this.error$ = new Subject();
  }

  isError(value: boolean) {
    console.log(value);
    this.error$.next(value);
  }

  getError() {
    return this.error$.asObservable();
  }

}
