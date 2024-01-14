import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from 'src/app/core/services/category.service';
import { ICategory } from 'src/app/models/category.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemErrorService } from 'src/app/core/services/system-error.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'operation'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  search: string = '';

  constructor(
    private categoryService: CategoryService,
    private alert: NotificationService,
    private error: SystemErrorService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((response: ICategory[]) => {
        this.dataSource.data = response;
      });
  }

  delete(id: number) {
    this.categoryService.deleteCategory(id)
      .subscribe(
        () => {
          this.alert.showAlert({ icon: "success", message: "Categoría eliminada" });
          this.getCategories();
        },
        () => {
          this.error.isError(true);//Le notifico al servicio que hubo un error con true
        }
      );

  }
}