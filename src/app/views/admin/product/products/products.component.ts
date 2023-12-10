import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SystemErrorService } from 'src/app/core/services/system-error.service';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'price', 'operation'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private productService: ProductService,
    private alert: NotificationService,
    private error: SystemErrorService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe((respuesta: IProduct[]) => {
        this.dataSource.data = respuesta;
      });
  }

  deleteProduct(id: number) {
    this.productService.delete(id)
      .subscribe(
        () => {
          this.alert.showAlert({ icon: "success", message: "Producto eliminado" });
          this.getProducts();
        },
        () => {
          this.error.isError(true);
        }
      );
  }
}
