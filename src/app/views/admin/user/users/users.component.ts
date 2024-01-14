import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemErrorService } from 'src/app/core/services/system-error.service';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'operation'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private userService: UserService,
    private alert: NotificationService,
    private error: SystemErrorService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((response: IUser[]) => {
        this.dataSource.data = response;
      });
  }

  deleteUser(id:number) {
    this.userService.deleteUser(id)
      .subscribe(
        () => {
          this.alert.showAlert({ icon: "success", message: "Usuario eliminado" });
          this.getUsers();
        },
        () => {
          this.error.isError(true);
        }
      );
  }
}