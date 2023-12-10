import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemErrorService } from 'src/app/core/services/system-error.service';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/app/models/user.model';

import { REGEX } from 'src/app/shared/constants/regex';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  id: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private alert: NotificationService,
    private route: Router,
    private error: SystemErrorService,
    private router: ActivatedRoute
  ) {
    this.validators();
    this.id = router.snapshot.params["id"];// obtener el parametro id de la url
  }

  ngOnInit(): void {
    if (this.id) {
      this.getUserById();
    }
  }

  getUserById() {
    this.userService.getById(this.id)
      .subscribe(
        (response: IUser) => {
          console.log("response: ", response);
          this.myForm.patchValue(response);
          // this.myForm.patchValue({email: "vane@gmail.com", avatar: "Ang", name: "Luz vanessa"});  // para lograr mostrar la categoria en la vista de producto, tienes que hacer uso del operador spread
        }
      )
  }

  saveUser() {
    this.userService.add(this.myForm.value)
      .subscribe(
        () => {
          this.alert.showAlert({ title: 'Se ha agregado con éxito la categoria' });
          this.route.navigateByUrl('/admin/users');
        },
        () => {
          this.error.isError(true)
        }
      );
  }

  updateUser() {
    this.userService.updateUser(this.id, this.myForm.value)
    .subscribe(
      () => {
        this.alert.showAlert({icon:"success", message: "Usuario actualizado con exito"});
      }
    )
  }

  get input(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  validators() {
    this.myForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      name: ['', [
        Validators.required,
        Validators.pattern(REGEX.name)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(REGEX.password),
      ]],
      role: ['', [
        Validators.required,
      ]],
      avatar: ['', [
        Validators.required,
        Validators.pattern(REGEX.avatar)
      ]],
    });
  }
}
