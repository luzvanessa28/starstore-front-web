import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { REGEX } from 'src/app/shared/constants/regex';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup = new FormGroup({});
  message: string = "";
  isError: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.validators();
  }

  ngOnInit(): void {
  }

  save() {
    this.userService.add(this.myForm.value)
      .subscribe(
        () => {
          this.message = "Registro exitoso";
          this.isError = false;
        },
        () => {
          this.message = "Hubo un error en su registro";
          this.isError = true;
        }
      );

    setTimeout(() => {
      this.message = "";
      this.isError = false;
    }, 3000);

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
