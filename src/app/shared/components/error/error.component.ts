import { Component, OnInit } from '@angular/core';
import { SystemErrorService } from 'src/app/core/services/system-error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {

  constructor(
    private error: SystemErrorService
  ) { }

  ngOnInit(): void {
  }

  return() {
    this.error.isError(false);
  }
}
