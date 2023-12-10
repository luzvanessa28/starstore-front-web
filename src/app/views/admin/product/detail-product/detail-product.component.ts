import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.sass']
})
export class DetailProductComponent implements OnInit {
  idProduct: number;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.idProduct = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log(this.idProduct);
    this.getById();
  }

  getById() {
    this.productService.getById(this.idProduct)
      .subscribe(
        (response: IProduct) => {
          console.log(response);
          this.product = response;
        }
      )
  }

}
