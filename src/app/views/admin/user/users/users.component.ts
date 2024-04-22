import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  search: string = '';
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'role','operation'];
  paginator: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.getUsers();
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
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

}
