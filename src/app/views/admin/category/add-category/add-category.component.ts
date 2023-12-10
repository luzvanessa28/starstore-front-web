import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemErrorService } from 'src/app/core/services/system-error.service';
import { ICategory } from 'src/app/models/category.model';
import { REGEX } from 'src/app/shared/constants/regex';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit {

  myForm: FormGroup = new FormGroup({});
  id: any;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private alert: NotificationService,
    private router: Router,
    private error: SystemErrorService,
    private route: ActivatedRoute
  ) {
    this.validators();
    this.id = route.snapshot.params["id"];// obtener el parametro id de la url
  }

  ngOnInit(): void {
    if (this.id) {
      this.getCategoryById();
    }
  }

  getCategoryById() {
    this.categoryService.getById(this.id)
      .subscribe(
        (response: ICategory) => {
          this.myForm.patchValue(response); // Aquí estoy asignando/añadiendo a los campos del formulario
        }
      )
  }

  saveCategory() {
    this.categoryService.addCategory(this.myForm.value)
      .subscribe(
        () => {
          this.alert.showAlert({ icon: "success", message: "Categoría agregada" });
          this.router.navigateByUrl('/admin/categories');
        },
        () => {
          this.error.isError(true);
        }
      )
  }

  updateCategory() {
    this.categoryService.updateCategory(this.id, this.myForm.value)
      .subscribe(
        () => {
          this.alert.showAlert({icon:"success", message: "Categoría actualizada con exito"});
          this.router.navigateByUrl('/admin/categories');
        },
        () => {
          this.error.isError(true);
        }
      )
  }

  get input(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  validators() {
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(REGEX.name)
      ]],
      image: ['', [
        Validators.required,
        Validators.pattern(REGEX.avatar)
      ]]
    });
  }
}
