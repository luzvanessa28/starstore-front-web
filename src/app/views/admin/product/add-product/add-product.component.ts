import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SystemErrorService } from 'src/app/core/services/system-error.service';
import { ICategory } from 'src/app/models/category.model';
import { IProduct } from 'src/app/models/product.model';
import { REGEX } from 'src/app/shared/constants/regex';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent implements OnInit {

  myForm: FormGroup = new FormGroup({});
  productoForm: any;
  categoryOptions: Array<ICategory> = [];
  id: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private alert: NotificationService,
    private router: Router,
    private categoryService: CategoryService,
    private error: SystemErrorService,
    private route: ActivatedRoute
  ) {
    this.validators();
    this.id = route.snapshot.params["id"];// obtener el parametro id de la url
  }

  ngOnInit(): void {
    this.getCategories();

    if (this.id) {
      this.getProductById();
    }
  }

  saveProduct() {

    const { title, price, description, categoryId, images } = this.myForm.value; // Aquí estoy haciendo una destructuración

    let product = {
      title: title,
      price: Number(price), // así se realiza una conversión de una cadena a numero
      description: description,
      categoryId: Number(categoryId),
      images: [images] // así se crea un arreglo que inicialmente era solo cadena
    };

    this.productService.addProduct(product)
      .subscribe(
        () => {
          this.alert.showAlert({ icon: "success", message: "Producto agregado" });
          this.router.navigateByUrl('/admin/products');
        },
        () => {
          this.error.isError(true);
        }
      );
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(
        (response: ICategory[]) => {
          this.categoryOptions = response;
        }
      );

  }

  getProductById() {
    this.productService.getById(this.id)
      .subscribe(
        (response: IProduct) => {
          this.myForm.patchValue({ ...response, categoryId: response.category.id });
        }
      )
  }

  updateProduct() {
    this.productService.updateProduct(this.id, this.myForm.value)
      .subscribe(
        () => {
          this.alert.showAlert({ icon: "success", message: "Producto actualizado correctamente" });
        }
      )
  }

  get input(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  validators() {
    this.myForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(REGEX.name)
      ]],
      price: ['', [
        Validators.required,
        Validators.pattern(REGEX.price)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(REGEX.description)
      ]],
      categoryId: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],
      images: ['', [
        Validators.required,
        Validators.pattern(REGEX.images)
      ]]
    })
  }
}
