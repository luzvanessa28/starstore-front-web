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
    private fb: FormBuilder,
    private userService: UserService,
    private alert: NotificationService,
    private router: Router,
    private error: SystemErrorService,
    private route: ActivatedRoute
  ) {
    this.validators();
    this.id = route.snapshot.params["id"];
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    if (this.id) {
      this.getUserById();
    }
  }

  saveUser() {
    console.log("saveUser");
    this.userService.addUser(this.myForm.value)
      .subscribe(
        () => {
          this.alert.showAlert({ icon: "success", message: "Usuario agregado" });
          this.router.navigateByUrl("/admin/user")
        },
        () => {
          this.error.isError(true);
        }
      )
  }

  get input(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  getUserById() {
    console.log("metodo getUserById");
    this.userService.getById(this.id)
      .subscribe((response: IUser) => {
        this.myForm.patchValue(response);
      })
  }

  validators() {
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(REGEX.name)
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(3),
        // Validators.pattern(REGEX.password)
      ]],
      role: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(REGEX.name)
      ]],
      avatar: ['', [
        Validators.required,
        Validators.pattern(REGEX.avatar)
      ]]
    });
  }
}
