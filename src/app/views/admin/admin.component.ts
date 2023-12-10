import { Component, OnInit } from '@angular/core';
import { SystemErrorService } from 'src/app/core/services/system-error.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  hasError: boolean = false;
  isSidebarOpen = true;

  constructor(
    private error: SystemErrorService
  ) { }

  ngOnInit(): void {
    this.error.getError()
      .subscribe(
        (response: boolean) => {
          this.hasError = response;
        }
      )
  }

}
